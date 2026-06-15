import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ConnectService } from '../../core/services/connect.service';
import { BaseTableComponent, BaseTableColumn, BaseTableAction } from 'base';

interface UIComponentInfo {
  id: string;
  nameKey: string;
  descKey: string;
  category: 'buttons' | 'cards' | 'inputs' | 'indicators';
  variants: {
    id: string;
    name: string;
    htmlTemplate: string;
  }[];
}

interface WorkbenchItem {
  id: string;
  componentId: string;
  name: string;
  x: number; // Percentage or px offset
  y: number;
  variantId: string;
  // Interactive state
  stateData?: any;
}

@Component({
  selector: 'app-ui-kit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BaseTableComponent],
  templateUrl: './ui-kit.html',
  styleUrl: './ui-kit.scss'
})
export class UiKitComponent {
  public readonly lang = inject(LanguageService);
  public readonly connect = inject(ConnectService);

  // Mock Data for Base Table
  tableData = signal<any[]>([
    { id: 1, name: 'Obsidian Node 01', type: 'Validator', status: 'SUCCESS', efficiency: 98.4, joined: '2026-01-10' },
    { id: 2, name: 'Obsidian Node 02', type: 'Gateway', status: 'WARNING', efficiency: 85.1, joined: '2026-02-15' },
    { id: 3, name: 'Obsidian Node 03', type: 'Bridge', status: 'DANGER', efficiency: 42.0, joined: '2026-03-01' },
    { id: 4, name: 'Obsidian Node 04', type: 'Validator', status: 'SUCCESS', efficiency: 99.9, joined: '2026-04-12' },
    { id: 5, name: 'Obsidian Node 05', type: 'Validator', status: 'SUCCESS', efficiency: 97.2, joined: '2026-05-20' },
    { id: 6, name: 'Obsidian Node 06', type: 'Gateway', status: 'DEFAULT', efficiency: 0.0, joined: '2026-06-01' },
    { id: 7, name: 'Obsidian Node 07', type: 'Bridge', status: 'SUCCESS', efficiency: 95.8, joined: '2026-06-10' }
  ]);

  tableColumns: BaseTableColumn[] = [
    { key: 'id', title: 'ID', width: 60, sortable: true },
    { key: 'name', title: 'Node Name', sortable: true, filterable: true, copyable: true },
    { key: 'type', title: 'Type', sortable: true },
    { key: 'status', title: 'Status', type: 'status', sortable: true },
    { key: 'efficiency', title: 'Efficiency', type: 'number', sortable: true, format: (val: any) => `${val}%` },
    { key: 'joined', title: 'Joined Date', type: 'date', sortable: true }
  ];

  tableActions: BaseTableAction[] = [
    {
      key: 'reboot',
      label: 'Reboot',
      icon: 'restart_alt',
      type: 'primary',
      confirm: {
        title: 'Reboot Node',
        message: 'Are you sure you want to reboot this validation node?',
        okText: 'Reboot',
        cancelText: 'Cancel'
      }
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: 'delete',
      type: 'danger',
      confirm: {
        title: 'Delete Node',
        message: 'This will permanently remove the node. Proceed?',
        okText: 'Delete',
        cancelText: 'Cancel'
      }
    }
  ];

  onTableAction(event: any) {
    this.showToast(`Action: ${event.action.label} on row: ${event.row.name}`);
  }

  onTableRowClick(event: any) {
    console.log('Row clicked:', event.row);
  }

  // Styling Customizer States
  primaryHue = 224;
  primarySat = 80;
  primaryLight = 60;
  glassOpacity = 12;
  glassBlur = 15;
  borderWeight = 'thin'; // 'none' | 'thin' | 'thick'

  // Component Library States
  selectedCategory = 'all';
  searchQuery = '';
  selectedComponentId = 'btn-action';
  selectedVariantId = 'filled';

  // Notification Toast States
  toastVisible = false;
  toastMessage = '';

  // Workbench Sandbox States
  workbenchItems = signal<WorkbenchItem[]>([]);
  draggedItemId: string | null = null;
  dragStartX = 0;
  dragStartY = 0;

  // Pre-configured UI Components Definition
  readonly components: UIComponentInfo[] = [
    {
      id: 'btn-action',
      nameKey: 'UI_KIT_CAT_BUTTONS',
      descKey: 'WIDGET_UI_KIT_DESC',
      category: 'buttons',
      variants: [
        {
          id: 'filled',
          name: 'Filled Gradient',
          htmlTemplate: `<button class="bg-gradient-to-r from-[--primary-val] to-[--secondary-val] text-black px-xl py-sm rounded-lg font-bold shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:scale-[1.03] transition-all duration-300">
  Primary Action
</button>`
        },
        {
          id: 'outlined',
          name: 'Glass Outlined',
          htmlTemplate: `<button class="bg-white/5 border border-[--primary-val] text-[--primary-val] px-xl py-sm rounded-lg font-bold hover:bg-[--primary-val]/10 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-all duration-300">
  Secondary Action
</button>`
        },
        {
          id: 'cyber-glow',
          name: 'Cyber Pulse Glow',
          htmlTemplate: `<button class="bg-[#050505] border-2 border-[--primary-val] text-on-surface px-xl py-sm rounded-lg font-mono font-bold tracking-widest hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.7)] animate-pulse transition-all duration-300">
  > INITIALIZE_
</button>`
        }
      ]
    },
    {
      id: 'frosted-plate',
      nameKey: 'UI_KIT_CAT_CARDS',
      descKey: 'WIDGET_UI_KIT_DESC',
      category: 'cards',
      variants: [
        {
          id: 'glass-standard',
          name: 'Standard Glass',
          htmlTemplate: `<div class="bg-white/[--glass-op] border-[--border-px] border-white/10 backdrop-blur-[--glass-blur] rounded-2xl p-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
  <h4 class="font-bold text-on-surface mb-sm">Standard Obsidian</h4>
  <p class="text-xs text-on-surface-variant leading-relaxed">A pristine translucent container suitable for all dashboard widgets.</p>
</div>`
        },
        {
          id: 'glass-glow',
          name: 'Interactive Edge Glow',
          htmlTemplate: `<div class="bg-[#0c0c0e]/90 border-[--border-px] border-[--primary-val]/30 backdrop-blur-[--glass-blur] rounded-2xl p-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] hover:border-[--primary-val]/80 transition-all duration-300">
  <h4 class="font-bold text-[--primary-val] mb-sm">Glowing Edge</h4>
  <p class="text-xs text-on-surface-variant leading-relaxed">Emphasizes active network components with custom glow borders.</p>
</div>`
        },
        {
          id: 'glass-hologram',
          name: 'Hologram Gradient',
          htmlTemplate: `<div class="bg-gradient-to-br from-white/[--glass-op] to-[--primary-val]/5 border-[--border-px] border-white/10 backdrop-blur-[--glass-blur] rounded-2xl p-xl shadow-2xl relative overflow-hidden">
  <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[--primary-val]/10 to-[--secondary-val]/10 blur-xl pointer-events-none"></div>
  <h4 class="font-bold text-on-surface mb-sm">Holographic Plate</h4>
  <p class="text-xs text-on-surface-variant leading-relaxed">Infused with a subtle multi-colored backing gradient layer.</p>
</div>`
        }
      ]
    },
    {
      id: 'console-input',
      nameKey: 'UI_KIT_CAT_INPUTS',
      descKey: 'WIDGET_UI_KIT_DESC',
      category: 'inputs',
      variants: [
        {
          id: 'prompt',
          name: 'Monospace Command Line',
          htmlTemplate: `<div class="flex items-center gap-sm bg-black/60 border border-white/10 rounded-lg px-md py-sm">
  <span class="font-mono text-[--primary-val] font-bold">&gt;</span>
  <input type="text" placeholder="Enter instruction..." class="bg-transparent border-none outline-none flex-grow font-mono text-xs text-[--primary-val] placeholder-[--primary-val]/30 focus:ring-0" />
</div>`
        },
        {
          id: 'glowing-field',
          name: 'Ambient Bottom Line',
          htmlTemplate: `<div class="relative w-full">
  <input type="text" placeholder="Enter configuration..." class="w-full bg-white/5 border-b border-white/10 focus:border-[--primary-val] px-md py-sm rounded-t-lg outline-none text-xs text-on-surface transition-all duration-300" />
  <div class="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[--primary-val] to-[--secondary-val] transition-all duration-300 peer-focus:w-full"></div>
</div>`
        }
      ]
    },
    {
      id: 'system-indicator',
      nameKey: 'UI_KIT_CAT_INDICATORS',
      descKey: 'WIDGET_UI_KIT_DESC',
      category: 'indicators',
      variants: [
        {
          id: 'pulse-dot',
          name: 'Pulsing Status Pill',
          htmlTemplate: `<span class="bg-white/5 border border-green-500/20 px-md py-xs rounded-full text-green-400 font-mono text-[10px] flex items-center gap-sm max-w-fit">
  <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></span>
  NETWORK_ACTIVE
</span>`
        },
        {
          id: 'radial-sync',
          name: 'Orbital Ring Loader',
          htmlTemplate: `<div class="relative w-16 h-16 flex items-center justify-center">
  <div class="absolute w-full h-full rounded-full border border-dashed border-[--primary-val]/30 animate-[spin_8s_linear_infinite]"></div>
  <div class="absolute w-[80%] h-[80%] rounded-full border border-[--secondary-val]/20 animate-[spin_12s_linear_infinite_reverse]"></div>
  <span class="material-symbols-outlined text-[18px] text-[--primary-val] animate-pulse">sync</span>
</div>`
        }
      ]
    }
  ];

  constructor() {
    // Initialize with a few default widgets in the sandbox
    this.workbenchItems.set([
      {
        id: 'item-1',
        componentId: 'btn-action',
        name: 'Filled Gradient Button',
        x: 20,
        y: 20,
        variantId: 'filled',
        stateData: { clicks: 0 }
      },
      {
        id: 'item-2',
        componentId: 'system-indicator',
        name: 'Orbital Ring Loader',
        x: 65,
        y: 15,
        variantId: 'radial-sync'
      },
      {
        id: 'item-3',
        componentId: 'console-input',
        name: 'Monospace Command Line',
        x: 15,
        y: 65,
        variantId: 'prompt'
      }
    ]);
  }

  // Get active selected component
  get activeComponent(): UIComponentInfo {
    return this.components.find(c => c.id === this.selectedComponentId) || this.components[0];
  }

  // Get active selected variant
  get activeVariant(): { id: string; name: string; htmlTemplate: string } {
    const comp = this.activeComponent;
    return comp.variants.find(v => v.id === this.selectedVariantId) || comp.variants[0];
  }

  // Computed styles to represent the customizer
  get primaryColorHSL(): string {
    return `hsl(${this.primaryHue}, ${this.primarySat}%, ${this.primaryLight}%)`;
  }

  get secondaryColorHSL(): string {
    const secHue = (this.primaryHue + 60) % 360;
    return `hsl(${secHue}, ${this.primarySat}%, ${this.primaryLight}%)`;
  }

  get primaryRGB(): string {
    return this.hslToRgb(this.primaryHue, this.primarySat, this.primaryLight).join(',');
  }

  get secondaryRGB(): string {
    const secHue = (this.primaryHue + 60) % 360;
    return this.hslToRgb(secHue, this.primarySat, this.primaryLight).join(',');
  }

  get borderPx(): string {
    if (this.borderWeight === 'none') return '0px';
    if (this.borderWeight === 'thick') return '2px';
    return '1px';
  }

  // Generate CSS style variables object
  get dynamicVars() {
    return {
      '--primary-val': this.primaryColorHSL,
      '--secondary-val': this.secondaryColorHSL,
      '--primary-rgb': this.primaryRGB,
      '--secondary-rgb': this.secondaryRGB,
      '--glass-op': (this.glassOpacity / 100).toString(),
      '--glass-blur': `${this.glassBlur}px`,
      '--border-px': this.borderPx
    };
  }

  // Process template string, replacing the customizer CSS placeholders with actual values
  getCompiledCode(template: string): string {
    return template
      .replace(/\[--primary-val\]/g, this.primaryColorHSL)
      .replace(/\[--secondary-val\]/g, this.secondaryColorHSL)
      .replace(/rgba\(var\(--primary-rgb\),([\d.]+)\)/g, `rgba(${this.primaryRGB},$1)`)
      .replace(/rgba\(var\(--secondary-rgb\),([\d.]+)\)/g, `rgba(${this.secondaryRGB},$1)`)
      .replace(/\[--glass-op\]/g, (this.glassOpacity / 100).toString())
      .replace(/\[--glass-blur\]/g, `${this.glassBlur}px`)
      .replace(/\[--border-px\]/g, this.borderPx);
  }

  // Show a notification toast
  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 2500);
  }

  // Copy component markup
  copyCode(template: string) {
    const compiled = this.getCompiledCode(template);
    navigator.clipboard.writeText(compiled).then(() => {
      this.showToast(this.lang.t('UI_KIT_COPY_SUCCESS'));
    });
  }

  // Copy global Tailwind extensions
  copyTailwindConfig() {
    const config = `// Add this to your tailwind.config.js extend block:
colors: {
  primary: 'hsl(${this.primaryHue}, ${this.primarySat}%, ${this.primaryLight}%)',
  secondary: 'hsl(${(this.primaryHue + 60) % 360}, ${this.primarySat}%, ${this.primaryLight}%)',
  surface: '#050505',
},
backdropBlur: {
  flux: '${this.glassBlur}px',
}`;
    navigator.clipboard.writeText(config).then(() => {
      this.showToast('Tailwind configuration copied!');
    });
  }

  // Filter components list
  filteredComponents() {
    return this.components.filter(c => {
      if (this.selectedCategory !== 'all' && c.category !== this.selectedCategory) return false;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const compName = this.lang.t(c.nameKey).toLowerCase();
        return compName.includes(query);
      }
      return true;
    });
  }

  // Change category filter
  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  // Select component card
  selectComponent(comp: UIComponentInfo) {
    this.selectedComponentId = comp.id;
    this.selectedVariantId = comp.variants[0].id;
  }

  // Interactive sandbox: add item
  addToWorkbench(comp: UIComponentInfo, variantId: string) {
    const variant = comp.variants.find(v => v.id === variantId) || comp.variants[0];
    const id = `item-${Date.now()}`;
    const newItem: WorkbenchItem = {
      id,
      componentId: comp.id,
      name: `${comp.id === 'btn-action' ? 'Button' : comp.id === 'frosted-plate' ? 'Card' : comp.id === 'console-input' ? 'Input' : 'Indicator'} (${variant.name})`,
      x: 30 + Math.random() * 20,
      y: 30 + Math.random() * 20,
      variantId: variant.id,
      stateData: comp.id === 'btn-action' ? { clicks: 0 } : undefined
    };
    
    this.workbenchItems.update(items => [...items, newItem]);
    this.showToast('Component added to Sandbox!');
  }

  // Remove item from sandbox
  removeFromWorkbench(id: string) {
    this.workbenchItems.update(items => items.filter(i => i.id !== id));
  }

  // Trigger click simulation
  triggerItemAction(item: WorkbenchItem) {
    if (item.componentId === 'btn-action' && item.stateData) {
      item.stateData.clicks++;
      this.showToast(`Button clicked! Total: ${item.stateData.clicks}`);
    }
  }

  // Drag-and-drop mechanics in the sandbox
  onDragStart(event: MouseEvent, itemId: string) {
    this.draggedItemId = itemId;
    const item = this.workbenchItems().find(i => i.id === itemId);
    if (item) {
      // Offset cursor coordinate inside the element
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      this.dragStartX = event.clientX - rect.left;
      this.dragStartY = event.clientY - rect.top;
    }
    event.preventDefault();
  }

  onMouseMoveSandbox(event: MouseEvent, container: HTMLElement) {
    if (!this.draggedItemId) return;
    const rect = container.getBoundingClientRect();
    
    // Calculate new position as percentages within the sandbox container bounds
    let x = ((event.clientX - rect.left - this.dragStartX) / rect.width) * 100;
    let y = ((event.clientY - rect.top - this.dragStartY) / rect.height) * 100;
    
    // Clamp to boundaries
    x = Math.max(0, Math.min(85, x));
    y = Math.max(0, Math.min(85, y));

    this.workbenchItems.update(items => 
      items.map(item => item.id === this.draggedItemId ? { ...item, x, y } : item)
    );
  }

  onMouseUpSandbox() {
    this.draggedItemId = null;
  }

  // Helper HSL to RGB converter
  private hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4))
    ];
  }
}
