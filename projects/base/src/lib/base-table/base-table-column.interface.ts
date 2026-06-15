import { TemplateRef } from '@angular/core';

export interface BaseTableColumn<T = any> {
  key: keyof T | string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  copyable?: boolean;
  visible?: boolean; // defaults to true
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  type?: 'text' | 'number' | 'date' | 'currency' | 'status' | 'image' | 'custom';
  ellipsis?: boolean;
  tooltip?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  format?: (value: any, row: T, column: BaseTableColumn<T>) => string;
  cellTemplate?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  compareFn?: (a: T, b: T) => number;
  filterFn?: (value: any, row: T) => boolean;
  
  // Internal fields for drag & drop or resizes
  currentWidth?: number;
}
