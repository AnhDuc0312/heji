# Thư viện UI `base` (Angular Component Library)

Thư viện UI standalone, tối giản, hiện đại và không có phụ thuộc bên ngoài dành cho các dự án Angular nội bộ. Thành phần đầu tiên được phát triển là `base-table`.

---

## 1. Cài đặt từ GitLab Package Registry nội bộ

### Cấu hình `.npmrc` trong dự án sử dụng
Để npm hoặc pnpm nhận diện được registry GitLab nội bộ của doanh nghiệp, hãy tạo hoặc cập nhật file `.npmrc` ở thư mục gốc của dự án:

```ini
# Định nghĩa registry cho scope @base
@base:registry=https://gitlab.example.com/api/v4/packages/npm/
//gitlab.example.com/api/v4/packages/npm/:_authToken="YOUR_GITLAB_PERSONAL_ACCESS_TOKEN"
```

### Cài đặt package
Chạy lệnh cài đặt thư viện sau khi đã cấu hình `.npmrc`:

```bash
npm install @base/ui
# Hoặc với yarn/pnpm:
pnpm add @base/ui
```

---

## 2. Import `BaseTableComponent` vào Standalone Component

Trong Component của bạn, import trực tiếp `BaseTableComponent` và các interface cần thiết vào mảng `imports`:

```typescript
import { Component } from '@angular/core';
import { BaseTableComponent, BaseTableColumn, BaseTableAction } from '@base/ui';

@Component({
  selector: 'app-feature-page',
  standalone: true,
  imports: [BaseTableComponent],
  templateUrl: './feature-page.component.html'
})
export class FeaturePageComponent {
  // ...
}
```

---

## 3. Khai báo Columns

Mỗi cột trong bảng được định nghĩa bởi interface `BaseTableColumn<T>`:

```typescript
columns: BaseTableColumn<User>[] = [
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'username', title: 'Tên Đăng Nhập', sortable: true, filterable: true, copyable: true },
  { key: 'email', title: 'Email', ellipsis: true, tooltip: true },
  { key: 'role', title: 'Vai Trò', type: 'status' },
  { key: 'balance', title: 'Số Dư', type: 'currency', sortable: true },
  { key: 'createdAt', title: 'Ngày Tạo', type: 'date', sortable: true }
];
```

---

## 4. Truyền Dữ liệu (Data)

Bảng chấp nhận mảng generic dữ liệu đầu vào thông qua input `[data]`:

```html
<base-table [data]="usersList" [columns]="columns"></base-table>
```

---

## 5. Cấu hình Action Row

Cột hành động (Action) hỗ trợ xác nhận (confirm popover) và các kiểu nút khác nhau:

```typescript
actions: BaseTableAction<User>[] = [
  {
    key: 'edit',
    label: 'Sửa',
    icon: 'edit',
    type: 'default'
  },
  {
    key: 'delete',
    label: 'Xóa',
    icon: 'delete',
    type: 'danger',
    confirm: {
      title: 'Xóa người dùng',
      message: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      cancelText: 'Hủy'
    }
  }
];
```

---

## 6. Cấu hình Phân trang Client-Side (Mặc định)

Ở chế độ Client-side, bảng sẽ tự động tính toán số bản ghi và cắt lát mảng `data` để hiển thị trên giao diện:

```html
<base-table
  [data]="usersList"
  [columns]="columns"
  [showPagination]="true"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 50]"
  paginationMode="client">
</base-table>
```

---

## 7. Cấu hình Phân trang Server-Side

Ở chế độ Server-side, bảng không tự động cắt lát dữ liệu mà sẽ phát ra sự kiện `(pageChange)` để bạn gọi API:

```html
<base-table
  [data]="usersList"
  [columns]="columns"
  [showPagination]="true"
  [pageSize]="pageSize"
  [pageIndex]="pageIndex"
  [total]="totalCount"
  paginationMode="server"
  (pageChange)="onPageChange($event)">
</base-table>
```

Xử lý sự kiện trong Component:
```typescript
onPageChange(event: { pageIndex: number; pageSize: number }) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.fetchDataFromServer();
}
```

---

## 8. Xử lý Action Click

Nhận sự kiện khi người dùng click vào các action (và đã xác nhận nếu có confirm config):

```html
<base-table
  [data]="users"
  [columns]="columns"
  [actions]="actions"
  (actionClick)="onActionClick($event)">
</base-table>
```

```typescript
onActionClick(event: { action: BaseTableAction<User>; row: User }) {
  if (event.action.key === 'delete') {
    this.userService.deleteUser(event.row.id).subscribe();
  }
}
```

---

## 9. Xử lý Selected Rows (Selection)

Hỗ trợ chế độ chọn một hoặc nhiều dòng:

```html
<base-table
  [data]="users"
  [columns]="columns"
  [selectable]="true"
  selectionMode="multiple"
  (selectionChange)="onSelectionChange($event)">
</base-table>
```

```typescript
onSelectionChange(event: { selectedRows: User[]; selectedKeys: (string | number)[] }) {
  console.log('Các dòng được chọn:', event.selectedRows);
  console.log('Các Keys được chọn:', event.selectedKeys);
}
```

---

## 10. Xử lý Sắp xếp Server-Side

Khi chọn `sortMode="server"`, bảng sẽ phát ra sự kiện `(sortChange)` để xử lý tải lại dữ liệu:

```html
<base-table
  [data]="users"
  [columns]="columns"
  sortMode="server"
  (sortChange)="onSortChange($event)">
</base-table>
```

```typescript
onSortChange(event: { key: string; direction: 'asc' | 'desc' | null }) {
  this.sortQuery = event.direction ? `${event.key},${event.direction}` : null;
  this.fetchDataFromServer();
}
```

---

## 11. Custom Cell Template

Sử dụng `TemplateRef` để custom giao diện hiển thị cho một cột cụ thể:

```html
<!-- Định nghĩa template trong HTML của component cha -->
<ng-template #customRoleTemplate let-value let-row="row">
  <span class="custom-badge" [class.admin]="row.role === 'Admin'">
    {{ value | uppercase }}
  </span>
</ng-template>

<base-table [data]="users" [columns]="columns"></base-table>
```

Cấu hình cột liên kết với Template:
```typescript
@ViewChild('customRoleTemplate', { static: true }) customRoleTemplate!: TemplateRef<any>;

ngOnInit() {
  this.columns = [
    // ...
    { key: 'role', title: 'Vai Trò', cellTemplate: this.customRoleTemplate }
  ];
}
```

---

## 12. Custom Empty / Loading / Error Template

Bạn có thể thay đổi giao diện các trạng thái trống, đang tải hoặc có lỗi bằng cách truyền các template:

```html
<base-table
  [data]="users"
  [columns]="columns"
  [loading]="isLoading"
  [error]="errorMessage"
  [loadingTemplate]="customLoader"
  [emptyTemplate]="customEmpty"
  [errorTemplate]="customError">
</base-table>

<ng-template #customLoader>
  <div class="my-loader">Đang tải dữ liệu...</div>
</ng-template>

<ng-template #customEmpty>
  <div class="my-empty">Không tìm thấy bản ghi nào!</div>
</ng-template>

<ng-template #customError let-error>
  <div class="my-error">Có lỗi xảy ra: {{ error }}</div>
</ng-template>
```

---

## 13. Tùy biến Giao diện (Theming) bằng CSS Variables

Toàn bộ CSS của bảng được viết đóng gói cô lập (encapsulated) và cho phép ghi đè dễ dàng thông qua các CSS Variables. Áp dụng biến vào thẻ cha chứa bảng hoặc viết global:

```css
/* Custom theme sáng/tối dễ dàng */
.dark-theme-table {
  --base-table-bg: #121214;
  --base-table-color: #ffffff;
  --base-table-border-color: rgba(255, 255, 255, 0.08);
  --base-table-header-bg: rgba(255, 255, 255, 0.03);
  --base-table-header-color: #00dbe9;
  --base-table-row-hover-bg: rgba(255, 255, 255, 0.02);
  --base-table-selected-row-bg: rgba(0, 219, 233, 0.08);
  --base-table-primary: #00dbe9;
  --base-table-danger: #ef4444;
  --base-table-border-radius: 8px;
}
```

---

## 14. Đóng gói & Phát hành lên GitLab Package Registry nội bộ

### Bước 1: Biên dịch thư viện
Chạy lệnh biên dịch gói `base`:
```bash
npx ng build base
```
Sản phẩm biên dịch sẽ nằm trong thư mục `dist/base/`.

### Bước 2: Cấu hình `package.json` của thư viện để publish
Đảm bảo file `projects/base/package.json` chứa thông tin định danh scope:
```json
{
  "name": "@base/ui",
  "version": "1.0.0",
  "publishConfig": {
    "@base:registry": "https://gitlab.example.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
  }
}
```

### Bước 3: Đăng nhập và Publish
Di chuyển vào thư mục build `dist/base` và chạy lệnh publish:
```bash
cd dist/base
npm publish
```
*(Nếu chạy trong CI/CD pipeline của GitLab, bạn có thể tự động hóa việc này bằng cách sử dụng biến môi trường `${CI_JOB_TOKEN}`)*
