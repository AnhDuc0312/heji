import { Component, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

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
  challengeActive = false;
  challengeSuccess = false;

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
        if (this.challengeActive) {
          this.runChallengeOptimization();
        } else {
          this.runOptimizationSequence();
        }
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

      case 'ls':
        this.terminalLogs.push(
          `neuralis_diagnostics.log\n` +
          `access_keys.enc\n` +
          `network_topology.json\n` +
          `sys_config.yaml`
        );
        break;

      case 'cat':
        const file = parts[1];
        if (!file) {
          this.terminalLogs.push('Usage: cat [filename] (e.g. "cat access_keys.enc")');
        } else if (file === 'neuralis_diagnostics.log') {
          this.terminalLogs.push(
            `[2026-06-10 18:44:12] SYS_INIT: Neural networks initialized.\n` +
            `[2026-06-10 18:44:15] PORT_SYNC: Gateway linked over port 4200.\n` +
            `[2026-06-10 18:45:00] WARN: Jitter offset > 4ms on Alpha Node.\n` +
            `[2026-06-10 18:45:01] INFO: Kalman filter successfully applied.`
          );
        } else if (file === 'access_keys.enc') {
          this.terminalLogs.push(
            `-----BEGIN ENCRYPTED SECRET KEY-----\n` +
            `MIIEowIBAAKCAQEA0yX17y1aJ8df9d0c2e3b1474ea9e9a5c8df59f13\n` +
            `c8df59f13ea9e9a5c8df59f13000b0c6ff00dbe900dbe9\n` +
            `-----END ENCRYPTED SECRET KEY-----`
          );
        } else if (file === 'network_topology.json') {
          this.terminalLogs.push(
            `{\n` +
            `  "meshName": "Neuralis Obsidian Flux Mesh",\n` +
            `  "nodesCount": 5,\n` +
            `  "status": "OPERATIONAL",\n` +
            `  "efficiency": "${this.efficiency}%"\n` +
            `}`
          );
        } else if (file === 'sys_config.yaml') {
          this.terminalLogs.push(
            `allocator:\n` +
            `  cpu: ${this.cpuAlloc}\n` +
            `  ram: ${this.ramAlloc}\n` +
            `  net: ${this.netAlloc}\n` +
            `network: hash_location_strategy`
          );
        } else {
          this.terminalLogs.push(`Error: File "${file}" not found.`);
        }
        break;

      case 'ping':
        const target = parts[1];
        if (!target) {
          this.terminalLogs.push('Usage: ping [node_name] or ping [ip] (e.g. "ping alpha" or "ping 10.0.3.100")');
        } else {
          this.runPingSequence(target);
        }
        break;

      case 'matrix':
      case 'hack':
        this.runMatrixSequence();
        break;

      case 'encode':
        const toEncode = parts.slice(1).join(' ');
        if (!toEncode) {
          this.terminalLogs.push('Usage: encode [text] (e.g. "encode neuralis")');
        } else {
          try {
            const encoded = btoa(toEncode);
            this.terminalLogs.push(`Base64 Encoded: ${encoded}`);
          } catch(e) {
            this.terminalLogs.push('Error: Cannot encode binary string.');
          }
        }
        break;

      case 'decode':
        const toDecode = parts[1];
        if (!toDecode) {
          this.terminalLogs.push('Usage: decode [base64_string] (e.g. "decode bmV1cmFsaXM=")');
        } else {
          try {
            const decoded = atob(toDecode);
            this.terminalLogs.push(`Base64 Decoded: ${decoded}`);
          } catch(e) {
            this.terminalLogs.push('Error: Invalid Base64 sequence.');
          }
        }
        break;

      case 'hash':
        const toHash = parts.slice(1).join(' ');
        if (!toHash) {
          this.terminalLogs.push('Usage: hash [text] (e.g. "hash neuralis")');
        } else {
          let h = 0;
          for (let i = 0; i < toHash.length; i++) {
            h = (h << 5) - h + toHash.charCodeAt(i);
            h |= 0;
          }
          const hex = Math.abs(h).toString(16).padStart(8, '0') + 'b8f2d01e';
          this.terminalLogs.push(`SHA-256 Mock Hash: f3a8d9b1c0e257ab2d6f95c8df59f13${hex}`);
        }
        break;

      case 'rpc':
        const rpcTarget = parts[1];
        if (!rpcTarget || !['ethereum', 'solana', 'neuralis'].includes(rpcTarget)) {
          this.terminalLogs.push('Usage: rpc [ethereum|solana|neuralis] (e.g. "rpc neuralis")');
        } else {
          this.runRPCSequence(rpcTarget);
        }
        break;

      case 'challenge':
        this.runChallengeInit();
        break;

      default:
        this.terminalLogs.push(`${this.lang.t('CMD_NOT_FOUND')}"${cmd}"`);
        break;
    }

    this.scrollToBottom();
  }

  private runPingSequence(target: string) {
    this.isProcessing = true;
    this.terminalLogs.push(`PINGing ${target} with 32 bytes of data:`);
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const latency = Math.floor(Math.random() * 15) + (target.includes('omega') || target.includes('100') ? 800 : 4);
      this.terminalLogs.push(`  Reply from ${target}: bytes=32 time=${latency}ms TTL=64`);
      this.scrollToBottom();
      
      if (count >= 4) {
        clearInterval(interval);
        this.terminalLogs.push(`\nPing statistics for ${target}:\n  Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)`);
        this.isProcessing = false;
        this.scrollToBottom();
      }
    }, 400);
  }

  private runMatrixSequence() {
    this.isProcessing = true;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      let row = '';
      for (let i = 0; i < 40; i++) {
        row += Math.random() > 0.5 ? '1' : '0';
      }
      this.terminalLogs.push(row);
      this.scrollToBottom();
      
      if (count >= 15) {
        clearInterval(interval);
        this.terminalLogs.push(`\n[SYSTEM] Deep decryption complete. Core status clean.`);
        this.isProcessing = false;
        this.scrollToBottom();
      }
    }, 150);
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

  private runRPCSequence(network: string) {
    this.isProcessing = true;
    this.terminalLogs.push(`Querying RPC diagnostics for ${network.toUpperCase()} mainnet...`);
    
    let step = 0;
    const stats = [
      `[INFO] Handshake verified with node rpc-${network}-1.mainnet.org`,
      `[INFO] Block height: ${network === 'solana' ? '284,910,233' : (network === 'ethereum' ? '19,842,012' : '4,842,910')}`,
      `[INFO] Latency: ${Math.floor(Math.random() * 20) + 5}ms`,
      `[SUCCESS] RPC nodes active. Status: 100% operational.`
    ];
    
    const interval = setInterval(() => {
      this.terminalLogs.push(stats[step]);
      this.scrollToBottom();
      step++;
      
      if (step >= stats.length) {
        clearInterval(interval);
        this.isProcessing = false;
        this.scrollToBottom();
      }
    }, 350);
  }

  private runChallengeInit() {
    this.challengeActive = true;
    this.challengeSuccess = false;
    
    // Set a corrupted/unoptimized state
    this.cpuAlloc = 15;
    this.ramAlloc = 10;
    this.netAlloc = 25;
    
    // Break Node Omega
    this.nodes = this.nodes.map(n => {
      if (n.id === 5) return { ...n, status: 'critical', latency: 999 };
      if (n.id === 3) return { ...n, status: 'warning', latency: 320 };
      return n;
    });
    
    if (this.selectedNode?.id === 5 || this.selectedNode?.id === 3) {
      this.selectedNode = this.nodes[4];
    }

    this.terminalLogs.push(
      `==========================================\n` +
      `!!! DANGER: SYSTEM ANOMALY DETECTED !!!\n` +
      `==========================================\n` +
      `  Omega Node has crashed (status: CRITICAL).\n` +
      `  Total mesh sync latency: 999ms.\n` +
      `  Validator efficiency has dropped to 39%.\n\n` +
      `[CHALLENGE]:\n` +
      `  1. Adjust CPU Allocation to 80% or higher.\n` +
      `  2. Adjust Memory Allocation to 70% or higher.\n` +
      `  3. Adjust Network Allocation to 90% or higher.\n` +
      `  4. Type 'optimize' to perform diagnostic sync.\n` +
      `  (Solve this puzzle to obtain the Dev Access Keys!)`
    );
    this.scrollToBottom();
  }

  private runChallengeOptimization() {
    this.isProcessing = true;
    this.terminalLogs.push(`Running challenge optimization sequence...`);
    this.scrollToBottom();

    setTimeout(() => {
      // Evaluate allocations
      if (this.cpuAlloc >= 80 && this.ramAlloc >= 70 && this.netAlloc >= 90) {
        this.challengeSuccess = true;
        this.challengeActive = false;
        
        // Recover nodes
        this.nodes = this.nodes.map(n => ({ ...n, status: 'operational', latency: Math.floor(Math.random() * 8) + 4 }));
        if (this.selectedNode) {
          const updated = this.nodes.find(n => n.id === this.selectedNode!.id);
          if (updated) this.selectedNode = updated;
        }

        this.terminalLogs.push(
          `[INFO] Allocations verified... OK\n` +
          `[SUCCESS] Path optimization complete.\n` +
          `==========================================\n` +
          `*** CONGRATULATIONS: CHALLENGE SOLVED! ***\n` +
          `==========================================\n` +
          `  Sync latency restored to 6ms.\n` +
          `  Validator status: OPERATIONAL (100% efficiency).\n` +
          `  [ACCESS KEY GRANTED]:\n` +
          `  sk_neural_live_a8f9d0c2e3b1474ea9e9a5c8df59f13\n` +
          `  (Use this secret key to log into /draft/dashboard!)`
        );
      } else {
        this.terminalLogs.push(
          `[ERROR] System optimization failed.\n` +
          `  Reason: Allocation values do not meet minimum parameters:\n` +
          `    - CPU required: >=80% (Current: ${this.cpuAlloc}%)\n` +
          `    - Memory required: >=70% (Current: ${this.ramAlloc}%)\n` +
          `    - Network required: >=90% (Current: ${this.netAlloc}%)\n` +
          `  Please adjust sliders and try 'optimize' again.`
        );
      }
      this.isProcessing = false;
      this.scrollToBottom();
    }, 1200);
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
