import { BaseTableColumn } from './base-table-column.interface';
import { BaseTableAction } from './base-table-action.interface';

export interface BaseTableSortChangeEvent<T = any> {
  key: keyof T | string;
  direction: 'asc' | 'desc' | null;
}

export interface BaseTableFilterChangeEvent<T = any> {
  key: keyof T | string;
  value: any;
}

export interface BaseTableSelectionChangeEvent<T = any> {
  selectedRows: T[];
  selectedKeys: Array<string | number>;
}

export interface BaseTableActionClickEvent<T = any> {
  action: BaseTableAction<T>;
  row: T;
}

export interface BaseTableRowClickEvent<T = any> {
  event: MouseEvent;
  row: T;
}

export interface BaseTableExpandChangeEvent<T = any> {
  row: T;
  expanded: boolean;
  expandedRowKeys: Array<string | number>;
}
