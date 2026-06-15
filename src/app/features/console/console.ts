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

  // Gamification Challenge Variables
  activeChallenge: 'balancer' | 'codebreaker' | 'miner' | null = null;
  challengeStartTime = 0;
  codebreakerTarget = '';
  codebreakerCipher = '';
  minerTarget = 'neuralis_block_1042_';
  leaderboard: Array<{ name: string, challenge: string, time: number, date: string }> = [];
  justSolved: 'balancer' | 'codebreaker' | 'miner' | null = null;
  solvedTime = 0;

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
    this.loadLeaderboard();
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
        const sub = parts[1];
        if (!sub) {
          this.terminalLogs.push(
            `=== NEURALIS SECURITY PUZZLES ===\n` +
            `Available sub-commands:\n` +
            `  challenge list             - View all puzzle challenges\n` +
            `  challenge start [id|name]  - Start a puzzle (e.g. challenge start miner)\n` +
            `  challenge status           - View current active challenge status\n` +
            `  challenge leaderboard      - View high-score developer list`
          );
        } else if (sub === 'list') {
          this.terminalLogs.push(
            `=== CHALLENGES LIST ===\n` +
            `  1. balancer    - System Resource Allocation Slider Puzzle (Easy)\n` +
            `  2. codebreaker - Decrypt a randomized Base64 cipher (Medium)\n` +
            `  3. miner       - Find a Proof-of-Work nonce to mine a block (Hard)`
          );
        } else if (sub === 'leaderboard') {
          this.printLeaderboardCLI();
        } else if (sub === 'status') {
          if (this.activeChallenge) {
            const elapsed = Math.round((Date.now() - this.challengeStartTime) / 1000);
            this.terminalLogs.push(`Active Challenge: ${this.activeChallenge.toUpperCase()} (Elapsed time: ${elapsed}s)`);
          } else {
            this.terminalLogs.push('No active challenge. Start one with: "challenge start [name]"');
          }
        } else if (sub === 'start') {
          const targetChallenge = parts[2];
          if (!targetChallenge) {
            this.terminalLogs.push('Usage: challenge start [balancer|codebreaker|miner]');
          } else {
            this.startChallenge(targetChallenge);
          }
        } else {
          this.terminalLogs.push(`Unknown sub-command: challenge ${sub}`);
        }
        break;

      case 'submit':
        const answer = parts.slice(1).join(' ').trim();
        this.handleCipherSubmit(answer);
        break;

      case 'mine':
        const nonce = parts[1];
        if (!nonce) {
          this.terminalLogs.push('Usage: mine [nonce_number] (e.g. "mine 42")');
        } else {
          this.handleMining(nonce);
        }
        break;

      case 'name':
        const nameVal = parts.slice(1).join(' ').trim();
        this.handleNameRegistration(nameVal);
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

  private async runRPCSequence(network: string) {
    this.isProcessing = true;
    this.terminalLogs.push(`Querying RPC diagnostics for ${network.toUpperCase()} mainnet...`);
    this.scrollToBottom();

    if (network === 'neuralis') {
      setTimeout(() => {
        this.addLogLine(`[INFO] Handshake verified with rpc-neuralis-1.mainnet.org`);
        this.addLogLine(`[INFO] Current Epoch Slot: 4,842,910 (Block Height: 9,234,812)`);
        this.addLogLine(`[SUCCESS] Neuralis Consensus validator pipeline 100% operational.`);
        this.isProcessing = false;
        this.scrollToBottom();
      }, 800);
      return;
    }

    try {
      const startTime = Date.now();
      let blockNumber = '';
      let endpoint = '';
      let bodyData = {};

      if (network === 'ethereum') {
        endpoint = 'https://cloudflare-eth.com';
        bodyData = { jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 };
      } else if (network === 'solana') {
        endpoint = 'https://api.mainnet-beta.solana.com';
        bodyData = { jsonrpc: '2.0', id: 1, method: 'getEpochInfo' };
      }

      this.addLogLine(`[INFO] Contacting endpoint: ${endpoint}`);
      this.scrollToBottom();

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const json = await response.json();
      const latency = Date.now() - startTime;

      if (network === 'ethereum') {
        const hex = json.result;
        const num = parseInt(hex, 16);
        blockNumber = num.toLocaleString();
        this.addLogLine(`[INFO] Handshake verified with Ethereum Node.`);
        this.addLogLine(`[INFO] Latest Block Height: ${blockNumber}`);
      } else if (network === 'solana') {
        const slot = json.result.absoluteSlot;
        const height = json.result.blockHeight || slot;
        blockNumber = height.toLocaleString();
        this.addLogLine(`[INFO] Handshake verified with Solana Node.`);
        this.addLogLine(`[INFO] Current Absolute Slot: ${slot.toLocaleString()} (Height: ${blockNumber})`);
      }

      this.addLogLine(`[INFO] Connection latency: ${latency}ms`);
      this.addLogLine(`[SUCCESS] RPC metrics query complete.`);

    } catch (err: any) {
      this.addLogLine(`[WARNING] Public RPC query failed: ${err.message || err}`);
      this.addLogLine(`[INFO] Falling back to local cached network telemetry...`);
      const mockHeight = network === 'ethereum' ? '20,123,892' : '285,102,945';
      this.addLogLine(`[INFO] Handshake verified with fallback-${network}-rpc.org`);
      this.addLogLine(`[INFO] Cache Block Height: ${mockHeight} (latency: 45ms)`);
      this.addLogLine(`[SUCCESS] Backup link established.`);
    } finally {
      this.isProcessing = false;
      this.scrollToBottom();
    }
  }

  private addLogLine(line: string) {
    this.terminalLogs.push(line);
  }

  private runChallengeInit() {
    this.challengeActive = true;
    this.challengeSuccess = false;
    this.justSolved = null;
    
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
      `  4. Type "optimize" to perform diagnostic sync.\n` +
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
        this.activeChallenge = null;
        this.solvedTime = (Date.now() - this.challengeStartTime) / 1000;
        this.justSolved = 'balancer';
        
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
          `  Validator status: OPERATIONAL (100% efficiency).\n\n` +
          `  [ACCESS KEY GRANTED]:\n` +
          `  sk_neural_live_a8f9d0c2e3b1474ea9e9a5c8df59f13\n\n` +
          `  Type "name [your_name]" to register your score on the leaderboard!`
        );
      } else {
        this.terminalLogs.push(
          `[ERROR] System optimization failed.\n` +
          `  Reason: Allocation values do not meet minimum parameters:\n` +
          `    - CPU required: >=80% (Current: ${this.cpuAlloc}%)\n` +
          `    - Memory required: >=70% (Current: ${this.ramAlloc}%)\n` +
          `    - Network required: >=90% (Current: ${this.netAlloc}%)\n` +
          `  Please adjust sliders and try "optimize" again.`
        );
      }
      this.isProcessing = false;
      this.scrollToBottom();
    }, 1200);
  }

  private loadLeaderboard() {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem('neuralis_leaderboard');
    if (data) {
      this.leaderboard = JSON.parse(data);
    } else {
      this.leaderboard = [
        { name: 'QuantumByte', challenge: 'Balancer', time: 14.5, date: '2026-06-08' },
        { name: 'CyberSamurai', challenge: 'Codebreaker', time: 28.2, date: '2026-06-09' },
        { name: 'HexMiner', challenge: 'Miner', time: 39.8, date: '2026-06-10' }
      ];
      localStorage.setItem('neuralis_leaderboard', JSON.stringify(this.leaderboard));
    }
  }

  private saveScore(name: string, challenge: string, timeSeconds: number) {
    if (typeof window === 'undefined') return;
    const entry = {
      name: name || 'Anonymous Dev',
      challenge: challenge,
      time: parseFloat(timeSeconds.toFixed(1)),
      date: new Date().toISOString().split('T')[0]
    };
    this.leaderboard.push(entry);
    this.leaderboard.sort((a, b) => a.time - b.time);
    localStorage.setItem('neuralis_leaderboard', JSON.stringify(this.leaderboard));
  }

  private printLeaderboardCLI() {
    this.loadLeaderboard();
    this.terminalLogs.push(`=== NEURALIS DEVELOPER LEADERBOARD ===`);
    this.leaderboard.forEach((entry, idx) => {
      this.terminalLogs.push(
        `  ${idx + 1}. ${entry.name.padEnd(12)} | ${entry.challenge.padEnd(12)} | ${entry.time}s | ${entry.date}`
      );
    });
    this.scrollToBottom();
  }

  private startChallenge(target: string) {
    this.loadLeaderboard();
    this.challengeSuccess = false;
    this.justSolved = null;
    this.solvedTime = 0;

    if (target === '1' || target === 'balancer') {
      this.activeChallenge = 'balancer';
      this.challengeStartTime = Date.now();
      this.runChallengeInit();
    } else if (target === '2' || target === 'codebreaker') {
      this.activeChallenge = 'codebreaker';
      this.challengeStartTime = Date.now();
      this.challengeActive = true;
      this.codebreakerTarget = 'NEURAL_KEY_' + Math.random().toString(16).substring(2, 6).toUpperCase();
      this.codebreakerCipher = btoa(this.codebreakerTarget);

      this.terminalLogs.push(
        `=== Cryptographic Codebreaker Challenge Initialized ===\n` +
        `  Decrypt the following Base64 cipher key:\n` +
        `  Cipher: ${this.codebreakerCipher}\n\n` +
        `Instructions:\n` +
        `  1. Decode this text (Hint: use the "decode [string]" command).\n` +
        `  2. Submit your decoded string by typing: "submit [answer]" (e.g. submit NEURAL_KEY_ABCD)`
      );
    } else if (target === '3' || target === 'miner') {
      this.activeChallenge = 'miner';
      this.challengeStartTime = Date.now();
      this.challengeActive = true;
      
      this.terminalLogs.push(
        `=== Proof-of-Work Block Miner Challenge Initialized ===\n` +
        `  Find a numeric nonce such that the block hash starts with '0' (difficulty target).\n` +
        `  Block prefix: ${this.minerTarget}\n\n` +
        `Instructions:\n` +
        `  Try different nonces by typing "mine [number]" (e.g. "mine 42", "mine 108"...) until the block hash starts with '0'!`
      );
    } else {
      this.terminalLogs.push(`Error: Challenge "${target}" not found. Type "challenge list" for available options.`);
    }
    this.scrollToBottom();
  }

  private handleCipherSubmit(answer: string) {
    if (this.activeChallenge !== 'codebreaker') {
      this.terminalLogs.push("Error: No active codebreaker challenge. Start one with: 'challenge start codebreaker'");
      this.scrollToBottom();
      return;
    }

    if (answer.toUpperCase() === this.codebreakerTarget.toUpperCase()) {
      this.challengeSuccess = true;
      this.challengeActive = false;
      this.activeChallenge = null;
      this.solvedTime = (Date.now() - this.challengeStartTime) / 1000;
      this.justSolved = 'codebreaker';

      this.terminalLogs.push(
        `==========================================\n` +
        `*** CONGRATULATIONS: DECRYPTION MATCH! ***\n` +
        `==========================================\n` +
        `  Decrypted: ${this.codebreakerTarget}\n` +
        `  Time taken: ${this.solvedTime.toFixed(1)} seconds.\n\n` +
        `  [ACCESS KEY GRANTED]:\n` +
        `  sk_neural_live_a8f9d0c2e3b1474ea9e9a5c8df59f13\n\n` +
        `  Type "name [your_name]" to register your score on the leaderboard!`
      );
    } else {
      this.terminalLogs.push(`[ERROR] Decryption mismatch. Provided: "${answer}". Try again!`);
    }
    this.scrollToBottom();
  }

  private handleMining(nonce: string) {
    if (this.activeChallenge !== 'miner') {
      this.terminalLogs.push("Error: No active miner challenge. Start one with: 'challenge start miner'");
      this.scrollToBottom();
      return;
    }

    const test = `${this.minerTarget}${nonce}`;
    let h = 0;
    for (let i = 0; i < test.length; i++) {
      h = (h << 5) - h + test.charCodeAt(i);
      h |= 0;
    }
    const hex = Math.abs(h).toString(16).padStart(8, '0');
    
    this.terminalLogs.push(`[MINING] Nonce: ${nonce} | Block Hash: ${hex}`);

    if (hex.startsWith('0')) {
      this.challengeSuccess = true;
      this.challengeActive = false;
      this.activeChallenge = null;
      this.solvedTime = (Date.now() - this.challengeStartTime) / 1000;
      this.justSolved = 'miner';

      this.terminalLogs.push(
        `==========================================\n` +
        `*** CONGRATULATIONS: BLOCK MINED! ***\n` +
        `==========================================\n` +
        `  Winning Hash: ${hex}\n` +
        `  Nonce: ${nonce}\n` +
        `  Time taken: ${this.solvedTime.toFixed(1)} seconds.\n\n` +
        `  [ACCESS KEY GRANTED]:\n` +
        `  sk_neural_live_a8f9d0c2e3b1474ea9e9a5c8df59f13\n\n` +
        `  Type "name [your_name]" to register your score on the leaderboard!`
      );
    } else {
      this.terminalLogs.push(`  Hash does not meet target difficulty (must start with '0'). Keep mining!`);
    }
    this.scrollToBottom();
  }

  private handleNameRegistration(nameVal: string) {
    if (!this.justSolved || this.solvedTime <= 0) {
      this.terminalLogs.push('Error: No pending challenge solve found to register.');
      this.scrollToBottom();
      return;
    }

    const name = nameVal || 'Anonymous Dev';
    const challengeName = this.justSolved === 'balancer' ? 'Balancer' : 
                          this.justSolved === 'codebreaker' ? 'Codebreaker' : 'Miner';
    
    this.saveScore(name, challengeName, this.solvedTime);
    this.terminalLogs.push(`[SUCCESS] Registered ${name} on the leaderboard with time ${this.solvedTime.toFixed(1)}s!`);
    this.justSolved = null;
    this.solvedTime = 0;
    this.printLeaderboardCLI();
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
