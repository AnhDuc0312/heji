import { Component, inject, OnInit, OnDestroy, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language.service';
import { ConnectService } from '../../core/services/connect.service';

interface SiblingLink {
  labelKey: string;
  route: string;
}

@Component({
  selector: 'app-content-page',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './content-page.html',
  styleUrl: './content-page.scss'
})
export class ContentPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  public readonly lang = inject(LanguageService);
  public readonly connect = inject(ConnectService);

  private routeSub?: Subscription;

  category = signal<string>('');
  page = signal<string>('');

  // Sibling links for the sidebar
  sidebarLinks = signal<SiblingLink[]>([]);

  // Simulation State
  simState = signal<'idle' | 'running' | 'completed'>('idle');
  simProgress = signal<number>(0);
  simLogs = signal<string[]>([]);

  // For accordion FAQs (only used on docs/faq page)
  faqStates = signal<boolean[]>([false, false, false, false, false]);

  // Node mesh simulator variables
  nodesList: Array<{
    x: number;
    y: number;
    id: number;
    pulseRadius: number;
    pulseActive: boolean;
    color: string;
  }> = [];

  private nodeAnimId?: any;
  private _nodeCanvasRef?: ElementRef<HTMLCanvasElement>;

  @ViewChild('nodeCanvas') set nodeCanvasRef(content: ElementRef<HTMLCanvasElement> | undefined) {
    if (content) {
      this._nodeCanvasRef = content;
      setTimeout(() => this.initNodeCanvas(), 0);
    } else {
      this.stopNodeLoop();
    }
  }

  // Tokenomics Calculator variables
  stakeAmount = 50000;
  stakeMonths = 24;
  apyRate = 8.5;
  toastVisible = false;
  toastMessage = '';

  exportTokenomicsConfig() {
    const config = {
      token: 'NEURAL',
      stakeAmount: this.stakeAmount,
      stakeMonths: this.stakeMonths,
      apyRate: this.apyRate,
      estimatedPayout: Number(this.stakingTotalPayout.toFixed(4)),
      exportTimestamp: new Date().toISOString()
    };
    const jsonString = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      const current = this.lang.currentLang();
      if (current === 'vi') {
        this.toastMessage = 'Đã sao chép cấu hình staking JSON vào bộ nhớ tạm!';
      } else if (current === 'ko') {
        this.toastMessage = '스테이킹 설정 JSON이 클립보드에 복사되었습니다!';
      } else {
        this.toastMessage = 'Staking configuration JSON copied to clipboard!';
      }
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 2500);
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const cat = params['category'] || '';
      const pg = params['page'] || '';

      this.category.set(cat);
      this.page.set(pg);

      this.updateSidebarLinks(cat);
      this.resetSimulation();
      this.faqStates.set([false, false, false, false, false]);
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private updateSidebarLinks(cat: string) {
    let links: SiblingLink[] = [];
    if (cat === 'platform') {
      links = [
        { labelKey: 'SUB_QUANTUM_COMPUTE', route: '/draft/platform/quantum-compute' },
        { labelKey: 'SUB_NEURAL_MESH', route: '/draft/platform/neural-mesh' },
        { labelKey: 'SUB_BIO_SYNC', route: '/draft/platform/bio-sync' },
        { labelKey: 'SUB_SECURITY', route: '/draft/platform/security' },
        { labelKey: 'SUB_API', route: '/draft/platform/api' },
        { labelKey: 'SUB_PERFORMANCE', route: '/draft/platform/performance' }
      ];
    } else if (cat === 'ecosystem') {
      links = [
        { labelKey: 'SUB_NODES', route: '/draft/ecosystem/nodes' },
        { labelKey: 'SUB_VALIDATORS', route: '/draft/ecosystem/validators' },
        { labelKey: 'SUB_TOKENOMICS', route: '/draft/ecosystem/tokenomics' },
        { labelKey: 'SUB_GOVERNANCE', route: '/draft/ecosystem/governance' },
        { labelKey: 'SUB_INTEGRATIONS', route: '/draft/ecosystem/integrations' }
      ];
    } else if (cat === 'showcase') {
      links = [
        { labelKey: 'SUB_3D_EXPERIENCE', route: '/draft/showcase/3d-experience' },
        { labelKey: 'SUB_SPHERE', route: '/draft/sphere' },
        { labelKey: 'SUB_DESIGN_SYSTEM', route: '/draft/design-system' },
        { labelKey: 'SUB_LANDING_A', route: '/draft/landing-a' },
        { labelKey: 'SUB_LANDING_B', route: '/draft/landing-b' }
      ];
    } else if (cat === 'docs') {
      links = [
        { labelKey: 'SUB_GETTING_STARTED', route: '/draft/docs/getting-started' },
        { labelKey: 'SUB_ARCHITECTURE', route: '/draft/docs/architecture' },
        { labelKey: 'SUB_CLI', route: '/draft/docs/cli-reference' },
        { labelKey: 'SUB_API_REF', route: '/draft/docs/api-reference' },
        { labelKey: 'SUB_TUTORIALS', route: '/draft/docs/tutorials' },
        { labelKey: 'SUB_FAQ', route: '/draft/docs/faq' }
      ];
    } else if (cat === 'legal') {
      links = [
        { labelKey: 'SUB_TERMS', route: '/draft/legal/terms' },
        { labelKey: 'SUB_PRIVACY', route: '/draft/legal/privacy' },
        { labelKey: 'SUB_SECURITY_POLICY', route: '/draft/legal/security-policy' },
        { labelKey: 'SUB_COMPLIANCE', route: '/draft/legal/compliance' },
        { labelKey: 'SUB_SLA', route: '/draft/legal/sla' }
      ];
    }
    this.sidebarLinks.set(links);
  }

  // Generate translation keys dynamically
  getTranslationKey(prefix: string): string {
    const pgKey = this.page().toUpperCase().replace(/-/g, '_');
    const catKey = this.category().toUpperCase();
    return `${prefix}_${catKey}_${pgKey}`;
  }

  getCategoryTitleKey(): string {
    return `NAV_${this.category().toUpperCase()}`;
  }

  toggleFaq(index: number) {
    this.faqStates.update(states => {
      states[index] = !states[index];
      return [...states];
    });
  }

  resetSimulation() {
    this.simState.set('idle');
    this.simProgress.set(0);
    this.simLogs.set([]);
  }

  runSimulation() {
    if (this.simState() === 'running') return;
    this.simState.set('running');
    this.simProgress.set(0);
    this.simLogs.set([]);

    const messages = [
      `[INFO] Starting diagnostic sequence for ${this.page()}...`,
      '[INFO] Initializing cryptographic checks...',
      '[INFO] Scanning active node telemetry...',
      '[WARNING] High signal noise detected. Applying Kalman filters...',
      '[INFO] Syncing local neural matrices with root validator...',
      '[INFO] Verifying security certificates & signatures...',
      '[SUCCESS] All tests passed. Integrity check nominal!'
    ];

    let step = 0;
    this.addSimLog(messages[0]);

    const interval = setInterval(() => {
      const current = this.simProgress();
      if (current < 100) {
        const next = Math.min(100, current + 15);
        this.simProgress.set(next);
        
        step++;
        if (step < messages.length) {
          this.addSimLog(messages[step]);
        }

        if (next === 100) {
          clearInterval(interval);
          this.simState.set('completed');
          this.addSimLog('[SYSTEM] Diagnostic completed successfully.');
        }
      }
    }, 350);
  }

  private addSimLog(msg: string) {
    this.simLogs.update(logs => [...logs, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }

  // Node Mesh Simulator Logic
  private initNodeCanvas() {
    if (!this._nodeCanvasRef) return;
    const canvas = this._nodeCanvasRef.nativeElement;
    canvas.width = 300;
    canvas.height = 300;
    
    if (this.nodesList.length === 0) {
      this.nodesList = [
        { x: 70, y: 70, id: 1, pulseRadius: 0, pulseActive: false, color: '#00dbe9' },
        { x: 230, y: 80, id: 2, pulseRadius: 0, pulseActive: false, color: '#b0c6ff' },
        { x: 150, y: 220, id: 3, pulseRadius: 0, pulseActive: false, color: '#ecb2ff' }
      ];
    }
    
    this.startNodeLoop();
  }

  private startNodeLoop() {
    this.stopNodeLoop();
    const run = () => {
      this.updateNodes();
      this.drawNodes();
      this.nodeAnimId = requestAnimationFrame(run);
    };
    run();
  }

  private stopNodeLoop() {
    if (this.nodeAnimId) {
      cancelAnimationFrame(this.nodeAnimId);
      this.nodeAnimId = undefined;
    }
  }

  private updateNodes() {
    this.nodesList.forEach(node => {
      if (node.pulseActive) {
        node.pulseRadius += 2.5;
        if (node.pulseRadius > 80) {
          node.pulseRadius = 0;
          node.pulseActive = false;
        }
      }
    });
  }

  private drawNodes() {
    if (!this._nodeCanvasRef) return;
    const canvas = this._nodeCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Links between nodes
    ctx.lineWidth = 1;
    for (let i = 0; i < this.nodesList.length; i++) {
      for (let j = i + 1; j < this.nodesList.length; j++) {
        const n1 = this.nodesList[i];
        const n2 = this.nodesList[j];
        
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const opacity = (1 - dist / 180) * 0.35;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Ripple Pulses
    this.nodesList.forEach(node => {
      if (node.pulseActive) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
        const opacity = 1 - node.pulseRadius / 80;
        ctx.strokeStyle = `rgba(0, 219, 233, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });

    // Nodes
    this.nodesList.forEach(node => {
      ctx.beginPath();
      const glow = ctx.createRadialGradient(node.x, node.y, 1, node.x, node.y, 8);
      glow.addColorStop(0, node.color);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });
  }

  onNodeCanvasClick(e: MouseEvent) {
    if (!this._nodeCanvasRef) return;
    const canvas = this._nodeCanvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    const colors = ['#00dbe9', '#b0c6ff', '#ecb2ff', '#4ade80'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newNode = {
      x: clickX,
      y: clickY,
      id: this.nodesList.length + 1,
      pulseRadius: 0,
      pulseActive: true,
      color: randomColor
    };
    
    this.nodesList.push(newNode);
    
    // Wave propagation ripple effect
    this.nodesList.forEach(n => {
      if (n.id !== newNode.id) {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          setTimeout(() => {
            n.pulseActive = true;
            n.pulseRadius = 0;
          }, dist * 3);
        }
      }
    });
  }

  // Tokenomics Calculator SVG Line logic
  get stakingTotalPayout(): number {
    return this.stakeAmount * Math.pow(1 + this.apyRate/1200, this.stakeMonths);
  }

  get stakingChartPoints(): string {
    const points = [];
    const amount = this.stakeAmount;
    const months = this.stakeMonths;
    const rate = this.apyRate;
    
    const maxVal = this.stakingTotalPayout;
    const minVal = amount;
    const valRange = maxVal - minVal || 1;
    
    for (let i = 0; i <= 5; i++) {
      const m = (months * i) / 5;
      const val = amount * Math.pow(1 + rate/1200, m);
      const x = 10 + (180 * i) / 5;
      const y = 70 - ((val - minVal) / valRange) * 55;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  }

  get stakingChartAreaD(): string {
    const pts = this.stakingChartPoints;
    return `M 10,70 L ${pts} L 190,70 Z`;
  }

  get chartEndpointX(): number {
    return 190;
  }

  get chartEndpointY(): number {
    const pts = this.stakingChartPoints.split(' ');
    const lastPt = pts[pts.length - 1];
    return parseFloat(lastPt.split(',')[1]);
  }
}
