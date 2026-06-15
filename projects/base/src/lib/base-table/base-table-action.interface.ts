export interface BaseTableConfirmConfig {
  title?: string;
  message?: string;
  okText?: string;
  cancelText?: string;
}

export interface BaseTableAction<T = any> {
  key: string;
  label: string;
  icon?: string;
  type?: 'default' | 'primary' | 'danger' | 'link';
  visible?: boolean | ((row: T) => boolean);
  disabled?: boolean | ((row: T) => boolean);
  confirm?: boolean | BaseTableConfirmConfig;
  tooltip?: string;
  className?: string;
}
