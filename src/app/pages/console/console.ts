import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

interface MeshNode {
  id: number;
  name: string;
  ip: string;
  latency: number;
  temp: number;
  status: 'operational' | 'warning' | 'critical';
  x: number; // SVG mapping coordinates
  y: number;
}

@Component({
  selector: 'app-console',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './console.html',
  styleUrl: './console.scss'
})
export class ConsoleComponent implements AfterViewInit {
  public readonly lang = inject(LanguageService);

  @ViewChild('terminalBody') private terminalBodyRef!: ElementRef<HTMLDivElement>;

  // System resource allocation values (0 - 100)
  cpuAlloc = 70;
  ramAlloc = 60;
  netAlloc = 80;

  // Selected node for info panel
  selectedNode: MeshNode | null = null;

  // Command prompt input
  cmdInput = '';
  isProcessing = false;

  // Terminal log lines
  terminalLogs: string[] = [];

  // Default mesh nodes data
  nodes: MeshNode[] = [
    { id: 1, name: 'Node Alpha', ip: '10.0.1.12', latency: 4, temp: 32, status: 'operational', x: 100, y: 80 },
    { id: 2, name: 'Node Beta', ip: '10.0.1.15', latency: 12, temp: 38, status: 'operational', x: 260, y: 70 },
    { id: 3, name: 'Node Delta', ip: '10.0.2.89', latency: 185, temp: 54, status: 'warning', x: 160, y: 190 },
    { id: 4, name: 'Node Gamma', ip: '10.0.1.20', latency: 8, temp: 35, status: 'operational', x: 320, y: 170 },
    { id: 5, name: 'Node Omega', ip: '10.0.3.100', latency: 999, temp: 72, status: 'critical', x: 230, y: 270 }
  ];

  constructor() {
    this.selectedNode = this.nodes[0];
    this.initializeLogs();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  // Calculate overall sync efficiency based on allocations
  get efficiency(): number {
    // If Omega is critical, efficiency is degraded
    const omega = this.nodes.find(n => n.id === 5);
    const multiplier = omega && omega.status === 'critical' ? 0.65 : 1.0;
    const avg = (this.cpuAlloc + this.ramAlloc + this.netAlloc) / 3;
    return Math.round(avg * multiplier);
  }

  // SVG circular dial dashoffset
  get dialOffset(): number {
    const circumference = 251.2; // 2 * PI * r (r=40)
    return circumference - (this.efficiency / 100) * circumference;
  }

  selectNode(node: MeshNode) {
    this.selectedNode = node;
  }

  executeCommand() {
    const cmd = this.cmdInput.trim();
    if (!cmd || this.isProcessing) return;

    this.terminalLogs.push(`> ${cmd}`);
    this.cmdInput = '';

    const parts = cmd.toLowerCase().split(' ');
    const baseCmd = parts[0];

    switch (baseCmd) {
      case 'help':
        this.terminalLogs.push(this.lang.t('CMD_HELP'));
        break;

      case 'clear':
        this.terminalLogs = [];
        break;

      case 'status':
        this.terminalLogs.push(
          `--- ${this.lang.t('SYS_ALLOCATOR')} ---\n` +
          `  CPU: ${this.cpuAlloc}%\n` +
          `  RAM: ${this.ramAlloc}%\n` +
          `  NET: ${this.netAlloc}%\n` +
          `  SYNC EFFICIENCY: ${this.efficiency}%\n` +
          `  ACTIVE NODES: ${this.nodes.filter(n => n.status === 'operational').length}/${this.nodes.length}`
        );
        break;

      case 'optimize':
        this.runOptimizationSequence();
        break;

      case 'node':
        const nodeId = parseInt(parts[1], 10);
        const node = this.nodes.find(n => n.id === nodeId);
        if (node) {
          this.terminalLogs.push(
            `--- QUERYING [${node.name.toUpperCase()}] ---\n` +
            `  IP ADDRESS : ${node.ip}\n` +
            `  LATENCY    : ${node.latency} ms\n` +
            `  CORE TEMP  : ${node.temp}°C\n` +
            `  STATUS     : ${node.status.toUpperCase()}`
          );
        } else {
          this.terminalLogs.push(`Error: Node ID must be 1 to 5 (e.g. "node 3")`);
        }
        break;

      default:
        this.terminalLogs.push(`${this.lang.t('CMD_NOT_FOUND')}"${cmd}"`);
        break;
    }

    this.scrollToBottom();
  }

  private runOptimizationSequence() {
    this.isProcessing = true;
    this.terminalLogs.push(this.lang.t('CMD_OPTIMIZE_START'));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      this.terminalLogs.push(`  Optimizing... ${progress}%`);
      this.scrollToBottom();

      if (progress >= 100) {
        clearInterval(interval);
        
        // Recover all nodes to operational
        this.nodes = this.nodes.map(node => {
          if (node.id === 3) {
            return { ...node, latency: 6, temp: 31, status: 'operational' };
          }
          if (node.id === 5) {
            return { ...node, latency: 9, temp: 34, status: 'operational' };
          }
          return node;
        });

        // Sync selected node view
        if (this.selectedNode) {
          const updated = this.nodes.find(n => n.id === this.selectedNode!.id);
          if (updated) this.selectedNode = updated;
        }

        this.terminalLogs.push(this.lang.t('CMD_OPTIMIZE_DONE'));
        this.isProcessing = false;
        this.scrollToBottom();
      }
    }, 400);
  }

  private initializeLogs() {
    this.terminalLogs = [this.lang.t('CLI_WELCOME')];
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.terminalBodyRef) {
        const el = this.terminalBodyRef.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }
}
