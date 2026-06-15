import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy, 
  OnChanges, 
  SimpleChanges, 
  TemplateRef,
  Pipe,
  PipeTransform
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTableColumn } from './base-table-column.interface';
import { BaseTableAction, BaseTableConfirmConfig } from './base-table-action.interface';
import { BaseTablePageChangeEvent } from './base-table-pagination.interface';
import { 
  BaseTableSortChangeEvent, 
  BaseTableFilterChangeEvent, 
  BaseTableSelectionChangeEvent, 
  BaseTableActionClickEvent, 
  BaseTableRowClickEvent, 
  BaseTableExpandChangeEvent 
} from './base-table-event.interface';

// ==========================================
// STANDALONE FORMATTER PIPES
// ==========================================

@Pipe({
  name: 'widthCss',
  standalone: true
})
export class WidthCssPipe implements PipeTransform {
  transform(value?: string | number): string {
    if (value === undefined || value === null || value === '') return 'auto';
    return typeof value === 'number' ? `${value}px` : value;
  }
}

@Pipe({
  name: 'textFormatter',
  standalone: true
})
export class TextFormatterPipe implements PipeTransform {
  transform(value: any, column: BaseTableColumn, row: any): string {
    if (column.format) {
      return column.format(value, row, column);
    }
    return value !== undefined && value !== null ? String(value) : '';
  }
}

@Pipe({
  name: 'numberFormatter',
  standalone: true
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: any, column: BaseTableColumn, row: any): string {
    if (column.format) {
      return column.format(value, row, column);
    }
    const num = Number(value);
    if (isNaN(num)) return '';
    return num.toLocaleString();
  }
}

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: any, column: BaseTableColumn, row: any): string {
    if (column.format) {
      return column.format(value, row, column);
    }
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString();
  }
}

@Pipe({
  name: 'currencyFormatter',
  standalone: true
})
export class CurrencyFormatterPipe implements PipeTransform {
  transform(value: any, column: BaseTableColumn, row: any): string {
    if (column.format) {
      return column.format(value, row, column);
    }
    const num = Number(value);
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

@Component({
  selector: 'base-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WidthCssPipe,
    TextFormatterPipe,
    NumberFormatterPipe,
    DateFormatterPipe,
    CurrencyFormatterPipe
  ],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseTableComponent<T = any> implements OnChanges {
  // Data input
  @Input() data: T[] = [];
  @Input() columns: BaseTableColumn<T>[] = [];
  @Input() rowKey: string | ((row: T) => string | number) = 'id';
  
  // Status states
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  
  // Selection
  @Input() selectable: boolean = false;
  @Input() selectionMode: 'single' | 'multiple' = 'multiple';
  @Input() selectedRowKeys: Array<string | number> = [];
  
  // Pagination
  @Input() showPagination: boolean = true;
  @Input() paginationMode: 'client' | 'server' = 'client';
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  
  // Sorting & Filtering modes
  @Input() sortMode: 'client' | 'server' = 'client';
  @Input() filterMode: 'client' | 'server' = 'client';
  
  // Actions
  @Input() actionTitle: string = 'Actions';
  @Input() actions: BaseTableAction<T>[] = [];
  
  // Expandable row features
  @Input() expandable: boolean = false;
  @Input() expandedRowKeys: Array<string | number> = [];
  @Input() emptyText: string = 'No Data Available';

  // Custom Templates
  @Input() loadingTemplate?: TemplateRef<any>;
  @Input() emptyTemplate?: TemplateRef<any>;
  @Input() errorTemplate?: TemplateRef<any>;
  @Input() actionTemplate?: TemplateRef<any>;
  @Input() expandTemplate?: TemplateRef<any>;

  // Outputs
  @Output() rowClick = new EventEmitter<BaseTableRowClickEvent<T>>();
  @Output() rowDoubleClick = new EventEmitter<BaseTableRowClickEvent<T>>();
  @Output() actionClick = new EventEmitter<BaseTableActionClickEvent<T>>();
  @Output() selectionChange = new EventEmitter<BaseTableSelectionChangeEvent<T>>();
  @Output() pageChange = new EventEmitter<BaseTablePageChangeEvent>();
  @Output() sortChange = new EventEmitter<BaseTableSortChangeEvent<T>>();
  @Output() filterChange = new EventEmitter<BaseTableFilterChangeEvent<T>>();
  @Output() columnsChange = new EventEmitter<BaseTableColumn<T>[]>();
  @Output() copy = new EventEmitter<{ text: string; success: boolean }>();
  @Output() expandChange = new EventEmitter<BaseTableExpandChangeEvent<T>>();

  // Internal states
  processedData: T[] = [];
  totalRecords: number = 0;
  
  sortKey: keyof T | string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  
  activeFilters: { [key: string]: any } = {};

  // Selection Tracking
  private selectedKeysSet = new Set<string | number>();
  private selectedRowsList: T[] = [];

  // Drag & Drop reordering variables
  draggedIndex: number | null = null;
  dragOverIndex: number | null = null;

  // Confirm Modal state variables
  showConfirmModal: boolean = false;
  pendingAction: { action: BaseTableAction<T>; row: T } | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRowKeys']) {
      this.selectedKeysSet = new Set(this.selectedRowKeys);
      this.updateSelectedRowsList();
    }
    
    // Process data when changes occur
    this.refreshProcessedData();
  }

  // Refreshes and processes the data based on client vs server sorting/pagination/filtering
  refreshProcessedData() {
    let result = [...(this.data || [])];
    
    // 1. Client-Side Filtering
    if (this.filterMode === 'client' && Object.keys(this.activeFilters).length > 0) {
      result = result.filter(row => {
        return Object.keys(this.activeFilters).every(key => {
          const col = this.columns.find(c => c.key === key);
          const val = this.getCellValue(row, key);
          const filterVal = this.activeFilters[key];
          
          if (col?.filterFn) {
            return col.filterFn(filterVal, row);
          }
          return String(val ?? '').toLowerCase().includes(String(filterVal).toLowerCase());
        });
      });
    }

    // 2. Client-Side Sorting
    if (this.sortMode === 'client' && this.sortKey && this.sortDirection) {
      const col = this.columns.find(c => c.key === this.sortKey);
      result.sort((a, b) => {
        if (col?.compareFn) {
          const res = col.compareFn(a, b);
          return this.sortDirection === 'asc' ? res : -res;
        }
        const aVal = this.getCellValue(a, this.sortKey!);
        const bVal = this.getCellValue(b, this.sortKey!);
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = aVal < bVal ? -1 : 1;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Determine Total Records
    if (this.paginationMode === 'server') {
      this.totalRecords = this.total || (this.data ? this.data.length : 0);
      this.processedData = result; // No slicing for server-side pagination
    } else {
      this.totalRecords = result.length;
      
      // 3. Client-Side Pagination Slicing
      if (this.showPagination) {
        const startIndex = (this.pageIndex - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.processedData = result.slice(startIndex, endIndex);
      } else {
        this.processedData = result;
      }
    }
  }

  // Helper to extract nested cell values using dot notation if necessary
  getCellValue(row: any, key: any): any {
    if (!row || key === undefined || key === null) return '';
    const keyStr = String(key);
    if (!keyStr.includes('.')) {
      return row[key];
    }
    return keyStr.split('.').reduce((acc, part) => acc && acc[part], row);
  }

  getRowTrackBy(row: T): string | number {
    return this.getRowKey(row);
  }

  getRowKey(row: T): string | number {
    if (!row) return '';
    if (typeof this.rowKey === 'function') {
      return this.rowKey(row);
    }
    if (typeof this.rowKey === 'string' && this.rowKey in (row as any)) {
      return (row as any)[this.rowKey];
    }
    // Fallbacks
    if ('id' in (row as any)) return (row as any)['id'];
    if ('key' in (row as any)) return (row as any)['key'];
    return JSON.stringify(row);
  }

  // Selection Logic
  isSelected(row: T): boolean {
    return this.selectedKeysSet.has(this.getRowKey(row));
  }

  isAllSelected(): boolean {
    if (!this.processedData || this.processedData.length === 0) return false;
    return this.processedData.every(row => this.isSelected(row));
  }

  isSomeSelected(): boolean {
    if (!this.processedData || this.processedData.length === 0) return false;
    const selectedInPage = this.processedData.filter(row => this.isSelected(row)).length;
    return selectedInPage > 0 && selectedInPage < this.processedData.length;
  }

  toggleSelectRow(row: T) {
    const key = this.getRowKey(row);
    if (this.selectedKeysSet.has(key)) {
      this.selectedKeysSet.delete(key);
    } else {
      this.selectedKeysSet.add(key);
    }
    this.updateSelectedRowsList();
    this.emitSelectionChange();
  }

  selectSingleRow(row: T) {
    this.selectedKeysSet.clear();
    this.selectedKeysSet.add(this.getRowKey(row));
    this.updateSelectedRowsList();
    this.emitSelectionChange();
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.processedData.forEach(row => {
      const key = this.getRowKey(row);
      if (checked) {
        this.selectedKeysSet.add(key);
      } else {
        this.selectedKeysSet.delete(key);
      }
    });
    this.updateSelectedRowsList();
    this.emitSelectionChange();
  }

  private updateSelectedRowsList() {
    // If we have access to the full data array, find matches. Otherwise keep track.
    this.selectedRowsList = this.data.filter(row => this.selectedKeysSet.has(this.getRowKey(row)));
  }

  private emitSelectionChange() {
    this.selectedRowKeys = Array.from(this.selectedKeysSet);
    this.selectionChange.emit({
      selectedRows: this.selectedRowsList,
      selectedKeys: this.selectedRowKeys
    });
  }

  // Sorting Handler
  onSort(col: BaseTableColumn<T>) {
    if (!col.sortable) return;
    
    if (this.sortKey === col.key) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortKey = null;
      }
    } else {
      this.sortKey = col.key;
      this.sortDirection = 'asc';
    }

    if (this.sortMode === 'server') {
      this.sortChange.emit({
        key: this.sortKey || '',
        direction: this.sortDirection
      });
    } else {
      this.refreshProcessedData();
    }
  }

  // Pagination Helper Methods
  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize) || 1;
  }

  getStartRecord(): number {
    if (this.totalRecords === 0) return 0;
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  getEndRecord(): number {
    return Math.min(this.pageIndex * this.pageSize, this.totalRecords);
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.getTotalPages()) return;
    this.pageIndex = page;
    
    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });

    if (this.paginationMode === 'client') {
      this.refreshProcessedData();
    }
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.pageIndex = 1; // reset to page 1

    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });

    if (this.paginationMode === 'client') {
      this.refreshProcessedData();
    }
  }

  getVisiblePageRange(): number[] {
    const total = this.getTotalPages();
    const current = this.pageIndex;
    const range: number[] = [];
    const maxButtons = 5;

    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = Math.min(total, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  // Row Interactions
  onRowClick(event: MouseEvent, row: T) {
    this.rowClick.emit({ event, row });
  }

  onRowDoubleClick(event: MouseEvent, row: T) {
    this.rowDoubleClick.emit({ event, row });
  }

  // Row Expand/Collapse
  isExpanded(row: T): boolean {
    return this.expandedRowKeys.includes(this.getRowKey(row));
  }

  toggleExpandRow(event: MouseEvent, row: T) {
    event.stopPropagation();
    const key = this.getRowKey(row);
    const index = this.expandedRowKeys.indexOf(key);
    
    if (index > -1) {
      this.expandedRowKeys = this.expandedRowKeys.filter(k => k !== key);
    } else {
      this.expandedRowKeys = [...this.expandedRowKeys, key];
    }

    this.expandChange.emit({
      row: row,
      expanded: index === -1,
      expandedRowKeys: this.expandedRowKeys
    });
  }

  // Action Logic
  isActionVisible(act: BaseTableAction<T>, row: T): boolean {
    if (typeof act.visible === 'function') {
      return act.visible(row);
    }
    return act.visible !== false;
  }

  isActionDisabled(act: BaseTableAction<T>, row: T): boolean {
    if (typeof act.disabled === 'function') {
      return act.disabled(row);
    }
    return act.disabled === true;
  }

  onActionTrigger(act: BaseTableAction<T>, row: T) {
    if (act.confirm) {
      this.pendingAction = { action: act, row };
      this.showConfirmModal = true;
    } else {
      this.actionClick.emit({ action: act, row });
    }
  }

  getConfirmConfig(): BaseTableConfirmConfig {
    if (this.pendingAction && typeof this.pendingAction.action.confirm === 'object') {
      return this.pendingAction.action.confirm;
    }
    return {};
  }

  cancelConfirmAction() {
    this.showConfirmModal = false;
    this.pendingAction = null;
  }

  submitConfirmAction() {
    if (this.pendingAction) {
      this.actionClick.emit({
        action: this.pendingAction.action,
        row: this.pendingAction.row
      });
    }
    this.cancelConfirmAction();
  }

  // Drag & Drop Column Reordering
  onDragStart(event: DragEvent, index: number) {
    this.draggedIndex = index;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      // Set empty ghost image to let CSS translate handle layout nicely
      event.dataTransfer.setData('text/plain', String(index));
    }
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    this.dragOverIndex = index;
  }

  onDragLeave() {
    this.dragOverIndex = null;
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedIndex !== null && this.draggedIndex !== index) {
      const cols = [...this.columns];
      const [draggedCol] = cols.splice(this.draggedIndex, 1);
      cols.splice(index, 0, draggedCol);
      this.columns = cols;
      this.columnsChange.emit(cols);
    }
    this.draggedIndex = null;
    this.dragOverIndex = null;
  }

  // Column Resizing mouse dragging listeners
  startX = 0;
  startWidth = 0;
  resizingColumn: BaseTableColumn<T> | null = null;

  onResizeStart(event: MouseEvent, col: BaseTableColumn<T>, index: number) {
    event.stopPropagation();
    event.preventDefault();
    this.startX = event.clientX;
    const thElement = (event.target as HTMLElement).parentElement;
    this.startWidth = thElement ? thElement.offsetWidth : 100;
    this.resizingColumn = col;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (this.resizingColumn) {
        const deltaX = moveEvent.clientX - this.startX;
        const newWidth = Math.max(30, this.startWidth + deltaX);
        this.resizingColumn.width = newWidth;
        this.resizingColumn.currentWidth = newWidth;
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      this.resizingColumn = null;
      this.columnsChange.emit(this.columns);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // Styling / Layout Utilities
  getJustifyContent(align?: 'left' | 'center' | 'right'): string {
    if (align === 'center') return 'center';
    if (align === 'right') return 'flex-end';
    return 'flex-start';
  }

  getTotalColspan(): number {
    let count = this.columns.filter(c => c.visible !== false).length;
    if (this.expandable) count++;
    if (this.selectable) count++;
    if (this.actions && this.actions.length > 0) count++;
    return count;
  }

  getTooltipText(row: T, col: BaseTableColumn<T>): string {
    const val = this.getCellValue(row, col.key);
    if (col.format) {
      return col.format(val, row, col);
    }
    return String(val ?? '');
  }

  copyCellText(event: MouseEvent, row: T, col: BaseTableColumn<T>) {
    event.stopPropagation();
    const cellValue = this.getCellValue(row, col.key);
    let textToCopy = '';
    if (col.format) {
      textToCopy = col.format(cellValue, row, col);
    } else {
      textToCopy = String(cellValue ?? '');
    }

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        this.copy.emit({ text: textToCopy, success: true });
      },
      () => {
        this.copy.emit({ text: textToCopy, success: false });
      }
    );
  }

  // Sticky Offsets calculations
  getStickyLeftOffset(colIndex: number): number | string {
    const col = this.columns[colIndex];
    if (col.fixed !== 'left') return '';
    let offset = 0;
    if (this.selectable) offset += 50;
    if (this.expandable) offset += 50;
    for (let i = 0; i < colIndex; i++) {
      const c = this.columns[i];
      if (c.visible !== false) {
        offset += Number(c.currentWidth || c.width || 120);
      }
    }
    return offset;
  }

  getStickyRightOffset(colIndex: number): number | string {
    const col = this.columns[colIndex];
    if (col.fixed !== 'right') return '';
    let offset = 0;
    if (this.actions && this.actions.length > 0) offset += 150; // assumed action width
    for (let i = this.columns.length - 1; i > colIndex; i--) {
      const c = this.columns[i];
      if (c.visible !== false) {
        offset += Number(c.currentWidth || c.width || 120);
      }
    }
    return offset;
  }
}
