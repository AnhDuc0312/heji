import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BaseTableComponent, 
  BaseTableColumn, 
  BaseTableAction,
  BaseButtonComponent, 
  BaseInputComponent, 
  BaseSelectComponent, 
  BaseSwitchComponent, 
  BaseModalComponent, 
  BaseTooltipDirective, 
  BaseToastService, 
  BaseToastContainerComponent,
  BaseCardComponent,
  BaseTagComponent,
  BaseCheckboxComponent,
  BaseRadioGroupComponent,
  BaseRadioComponent,
  BaseTabsComponent,
  BaseTabComponent,
  BaseAccordionComponent,
  BaseAccordionPanelComponent,
  BaseProgressComponent,
  BaseDropdownComponent,
  BaseUploadComponent
} from 'base';

@Component({
  selector: 'app-ui-docs',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    BaseTableComponent,
    BaseButtonComponent,
    BaseInputComponent,
    BaseSelectComponent,
    BaseSwitchComponent,
    BaseModalComponent,
    BaseTooltipDirective,
    BaseToastContainerComponent,
    BaseCardComponent,
    BaseTagComponent,
    BaseCheckboxComponent,
    BaseRadioGroupComponent,
    BaseRadioComponent,
    BaseTabsComponent,
    BaseTabComponent,
    BaseAccordionComponent,
    BaseAccordionPanelComponent,
    BaseProgressComponent,
    BaseDropdownComponent,
    BaseUploadComponent
  ],
  templateUrl: './ui-docs.html',
  styleUrl: './ui-docs.scss'
})
export class UiDocsComponent {
  public readonly toastService = inject(BaseToastService);

  activeSection = signal<string>('introduction');

  // --- BUTTON LIVE PLAYGROUND STATE ---
  btnType: 'default' | 'primary' | 'danger' | 'ghost' | 'text' | 'link' = 'primary';
  btnSize: 'sm' | 'md' | 'lg' = 'md';
  btnDisabled = false;
  btnLoading = false;
  btnIcon = 'terminal';
  btnIconPosition: 'left' | 'right' = 'left';

  btnTypeOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Default', value: 'default' },
    { label: 'Danger', value: 'danger' },
    { label: 'Ghost', value: 'ghost' },
    { label: 'Text', value: 'text' },
    { label: 'Link', value: 'link' }
  ];

  btnSizeOptions = [
    { label: 'Small (sm)', value: 'sm' },
    { label: 'Medium (md)', value: 'md' },
    { label: 'Large (lg)', value: 'lg' }
  ];

  iconPositionOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' }
  ];

  // --- INPUT LIVE PLAYGROUND STATE ---
  inputLabel = 'Node API Key';
  inputPlaceholder = 'Enter your cryptographic key...';
  inputType: 'text' | 'password' | 'email' | 'number' = 'text';
  inputDisabled = false;
  inputError: string | null = null;
  inputHint = 'Keep this key secret and secure.';
  inputIcon = 'vpn_key';
  inputIconPosition: 'left' | 'right' = 'left';
  inputTextModel = '';

  inputTypeOptions = [
    { label: 'Text', value: 'text' },
    { label: 'Password', value: 'password' },
    { label: 'Email', value: 'email' },
    { label: 'Number', value: 'number' }
  ];

  // --- SELECT LIVE PLAYGROUND STATE ---
  selectLabel = 'Select Node Category';
  selectPlaceholder = 'Choose role...';
  selectMultiple = false;
  selectDisabled = false;
  selectError: string | null = null;
  selectShowSearch = true;
  selectOptions = [
    { label: 'Validator (PoS Consensus)', value: 'validator' },
    { label: 'Gateway (API Endpoint)', value: 'gateway' },
    { label: 'Bridge (Cross-chain Tunnel)', value: 'bridge' },
    { label: 'Relayer (Data Propagator)', value: 'relayer' }
  ];
  selectModel: any = null;

  // --- SWITCH LIVE PLAYGROUND STATE ---
  switchLabel = 'Enable Automated Backup';
  switchDisabled = false;
  switchModel = true;

  // --- MODAL LIVE PLAYGROUND STATE ---
  modalVisible = false;
  modalTitle = 'Configure Validation Node';
  modalWidth: string | number = 480;
  modalClosable = true;
  modalMaskClosable = true;
  modalLoading = false;
  modalOkText = 'Deploy Node';
  modalCancelText = 'Cancel';

  // --- TOOLTIP LIVE PLAYGROUND STATE ---
  tooltipText = 'This action will instantly lock the node\'s staked tokens.';
  tooltipPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  tooltipPlacementOptions = [
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' }
  ];

  // --- TOAST LIVE PLAYGROUND STATE ---
  toastMessageText = 'Validation block synced successfully.';
  toastTypeSelection: 'success' | 'danger' | 'info' | 'warning' = 'success';
  toastDurationVal = 3000;

  toastTypeOptions = [
    { label: 'Success', value: 'success' },
    { label: 'Info', value: 'info' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' }
  ];

  // --- TABLE LIVE PLAYGROUND STATE ---
  tableDataList = [
    { id: 'tx-101', client: 'Alice Vance', amount: 1540.25, method: 'USDT', status: 'SUCCESS', date: '2026-06-14' },
    { id: 'tx-102', client: 'Bob Carter', amount: 92.50, method: 'ETH', status: 'WARNING', date: '2026-06-14' },
    { id: 'tx-103', client: 'Charles Darwin', amount: 8400.00, method: 'BTC', status: 'SUCCESS', date: '2026-06-13' },
    { id: 'tx-104', client: 'David Hassel', amount: 0.00, method: 'SOL', status: 'DANGER', date: '2026-06-12' },
    { id: 'tx-105', client: 'Emily Blunt', amount: 310.80, method: 'USDC', status: 'DEFAULT', date: '2026-06-12' }
  ];

  tableColumnsList: BaseTableColumn[] = [
    { key: 'id', title: 'Tx ID', width: 90, sortable: true, copyable: true },
    { key: 'client', title: 'Sender', sortable: true, filterable: true },
    { key: 'amount', title: 'Amount', type: 'currency', sortable: true },
    { key: 'method', title: 'Asset', align: 'center' },
    { key: 'status', title: 'Status', type: 'status', sortable: true },
    { key: 'date', title: 'Date', type: 'date', sortable: true }
  ];

  tableActionsList: BaseTableAction[] = [
    {
      key: 'view',
      label: 'View',
      icon: 'visibility',
      type: 'default'
    },
    {
      key: 'refund',
      label: 'Refund',
      icon: 'undo',
      type: 'danger',
      confirm: {
        title: 'Refund Transaction',
        message: 'This will reverse the transaction and return the funds. Continue?',
        okText: 'Refund',
        cancelText: 'Hủy'
      }
    }
  ];

  // --- CARD LIVE PLAYGROUND STATE ---
  cardTitle = 'Consensus Validator Node';
  cardSubtitle = 'Active / Online';
  cardHoverable = true;
  cardGlow: 'cyan' | 'purple' | 'none' = 'cyan';
  cardBordered = true;

  cardGlowOptions = [
    { label: 'Cyan Glow', value: 'cyan' },
    { label: 'Purple Glow', value: 'purple' },
    { label: 'None', value: 'none' }
  ];

  // --- TAG LIVE PLAYGROUND STATE ---
  tagColor: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default' = 'primary';
  tagGlow = true;
  tagClosable = false;
  tagVisible = true;

  tagColorOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
    { label: 'Info', value: 'info' },
    { label: 'Default', value: 'default' }
  ];

  // --- CHECKBOX LIVE PLAYGROUND STATE ---
  checkboxLabel = 'Authorize Node Deployment';
  checkboxModel = false;
  checkboxDisabled = false;

  // --- RADIO LIVE PLAYGROUND STATE ---
  radioGroupModel = 'low';
  radioDisabled = false;

  // --- TABS LIVE PLAYGROUND STATE ---
  tabsSelectedIndex = 0;

  // --- ACCORDION LIVE PLAYGROUND STATE ---
  accordionMultiple = false;

  // --- PROGRESS LIVE PLAYGROUND STATE ---
  progressValue = 68;
  progressType: 'line' | 'circle' = 'line';
  progressStatus: 'success' | 'warning' | 'danger' | 'primary' = 'primary';
  progressStrokeWidth = 6;

  progressTypeOptions = [
    { label: 'Line (Bar)', value: 'line' },
    { label: 'Circle (Ring)', value: 'circle' }
  ];

  progressStatusOptions = [
    { label: 'Primary (Cyan)', value: 'primary' },
    { label: 'Success (Green)', value: 'success' },
    { label: 'Warning (Orange)', value: 'warning' },
    { label: 'Danger (Red)', value: 'danger' }
  ];

  // --- DROPDOWN LIVE PLAYGROUND STATE ---
  dropdownTrigger: 'click' | 'hover' = 'click';
  dropdownPlacement: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';

  dropdownTriggerOptions = [
    { label: 'Click Trigger', value: 'click' },
    { label: 'Hover Trigger', value: 'hover' }
  ];

  dropdownPlacementOptions = [
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' }
  ];

  // --- UPLOAD LIVE PLAYGROUND STATE ---
  uploadMultiple = true;
  uploadAccept = '.json, .txt';
  uploadDisabled = false;
  uploadDragDrop = true;

  onTableActionClick(event: any) {
    this.toastService.info(`Executed Action: ${event.action.label} on transaction ${event.row.id}`);
  }

  // Toast trigger helper
  triggerToastNotification() {
    this.toastService.show(this.toastMessageText, this.toastTypeSelection, this.toastDurationVal);
  }

  // Toast quick shortcuts triggers
  triggerQuickToast(type: 'success' | 'danger' | 'info' | 'warning') {
    switch (type) {
      case 'success':
        this.toastService.success('Consensus consensus validated successfully!');
        break;
      case 'danger':
        this.toastService.error('Connection timeout to node validator-02.');
        break;
      case 'warning':
        this.toastService.warning('Staking rewards pool is below 10%.');
        break;
      case 'info':
        this.toastService.info('Syncing node databases...');
        break;
    }
  }

  // Modal open helper
  openModalPlayground() {
    this.modalVisible = true;
  }

  // Modal save simulation
  onModalOkSubmit() {
    this.modalLoading = true;
    setTimeout(() => {
      this.modalLoading = false;
      this.modalVisible = false;
      this.toastService.success('Validation Node deployed successfully!');
    }, 2000);
  }

  // Copy helper
  copySnippet(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        this.toastService.success('Code snippet copied to clipboard!');
      });
    }
  }
}
