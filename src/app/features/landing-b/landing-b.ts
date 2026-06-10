import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ConnectService } from '../../core/services/connect.service';

@Component({
  selector: 'app-landing-b',
  imports: [RouterLink],
  templateUrl: './landing-b.html',
  styleUrl: './landing-b.scss'
})
export class LandingBComponent implements AfterViewInit, OnDestroy {
  public readonly lang = inject(LanguageService);
  private readonly connectService = inject(ConnectService);
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('crystal') crystalRef!: ElementRef<HTMLElement>;
  @ViewChild('heroGlow') heroGlowRef!: ElementRef<HTMLElement>;
  @ViewChild('crystalCanvas') crystalCanvasRef!: ElementRef<HTMLCanvasElement>;

  // 3D Crystal properties
  private crystalAngleX = 0.5;
  private crystalAngleY = 0.5;
  private crystalSpeedX = 0.005;
  private crystalSpeedY = 0.008;
  private crystalAnimId: number | null = null;
  private mouseDragStart = { x: 0, y: 0 };
  private isDraggingCrystal = false;

  onConnectClick() {
    this.connectService.openModal();
  }

  onSubscribeClick(input: HTMLInputElement) {
    const email = input.value.trim();
    if (!email) {
      const msg = this.lang.currentLang() === 'vi' ? 'Vui lòng nhập địa chỉ email hợp lệ.' : 
                  this.lang.currentLang() === 'ko' ? '올바른 이메일 주소를 입력하세요.' : 
                  'Please enter a valid email address.';
      alert(msg);
      return;
    }
    const successMsg = this.lang.currentLang() === 'vi' ? 'Đăng ký thành công! Cảm ơn bạn đã theo dõi.' : 
                       this.lang.currentLang() === 'ko' ? '구독에 성공했습니다! 구독해주셔서 감사합니다.' : 
                       'Subscription successful! Thank you for subscribing.';
    alert(successMsg);
    input.value = '';
  }

  private particles: Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }> = [];
  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.initParticles();
    this.animateParticles();
    this.setupScrollReveal();
    this.initCrystalCanvas();
    this.animateCrystal();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.crystalAnimId !== null) {
      cancelAnimationFrame(this.crystalAnimId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.initParticles();
    this.initCrystalCanvas();
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(e: MouseEvent) {
    if (!this.crystalRef || !this.heroGlowRef) return;
    const crystalEl = this.crystalRef.nativeElement;
    const glowEl = this.heroGlowRef.nativeElement;

    const x = (e.clientX - window.innerWidth / 2) / 30;
    const y = (e.clientY - window.innerHeight / 2) / 30;

    crystalEl.style.transform = `translate(${x}px, ${y}px) rotateY(${x / 2}deg) rotateX(${-y / 2}deg)`;
    glowEl.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;
    canvas.width = parent ? parent.clientWidth : window.innerWidth;
    canvas.height = parent ? parent.clientHeight : window.innerHeight;
    this.particles = [];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  private animateParticles() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(176, 198, 255, ${p.opacity})`;
      ctx.fill();
    });

    this.animationFrameId = requestAnimationFrame(() => this.animateParticles());
  }

  private setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => this.observer?.observe(el));
  }

  onCardTilt(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }

  onCardTiltLeave(card: HTMLElement) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }

  onMagneticMove(e: MouseEvent, wrap: HTMLElement, btn: HTMLElement) {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    wrap.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }

  onMagneticLeave(wrap: HTMLElement, btn: HTMLElement) {
    wrap.style.transform = `translate(0, 0)`;
    btn.style.transform = `translate(0, 0)`;
  }

  // 3D Crystal Engine Methods
  private initCrystalCanvas() {
    if (!this.crystalCanvasRef) return;
    const canvas = this.crystalCanvasRef.nativeElement;
    canvas.width = 400;
    canvas.height = 400;
  }

  private animateCrystal() {
    if (!this.crystalCanvasRef) return;
    const canvas = this.crystalCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Auto rotate if not dragging
      if (!this.isDraggingCrystal) {
        this.crystalAngleY += this.crystalSpeedY;
        this.crystalAngleX += this.crystalSpeedX;
        
        // Stabilize speeds
        this.crystalSpeedY += (0.008 - this.crystalSpeedY) * 0.05;
        this.crystalSpeedX += (0.005 - this.crystalSpeedX) * 0.05;
      }
      
      this.drawCrystal(ctx, canvas.width, canvas.height);
    }
    this.crystalAnimId = requestAnimationFrame(() => this.animateCrystal());
  }

  private getCrystalModel() {
    const vertices = [];
    // Central hexagon ring
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      vertices.push({ x: Math.cos(angle), y: 0, z: Math.sin(angle) });
    }
    // Top apex
    vertices.push({ x: 0, y: -1.4, z: 0 }); // index 6
    // Bottom apex
    vertices.push({ x: 0, y: 1.4, z: 0 });  // index 7

    // Define 12 triangular faces
    const faces = [
      [6, 0, 1], [6, 1, 2], [6, 2, 3], [6, 3, 4], [6, 4, 5], [6, 5, 0],
      [7, 1, 0], [7, 2, 1], [7, 3, 2], [7, 4, 3], [7, 5, 4], [7, 0, 5]
    ];
    
    return { vertices, faces };
  }

  private rotateX(p: { x: number; y: number; z: number }, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x,
      y: p.y * cos - p.z * sin,
      z: p.y * sin + p.z * cos
    };
  }

  private rotateY(p: { x: number; y: number; z: number }, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: p.x * cos + p.z * sin,
      y: p.y,
      z: -p.x * sin + p.z * cos
    };
  }

  private drawCrystal(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const cx = width / 2;
    const cy = height / 2;
    const scale = 110;
    
    const { vertices, faces } = this.getCrystalModel();
    
    // Project vertices
    const projected = vertices.map(v => {
      let p = this.rotateY(v, this.crystalAngleY);
      p = this.rotateX(p, this.crystalAngleX);
      const zoom = 1 + p.z * 0.15;
      return {
        x: cx + p.x * scale * zoom,
        y: cy + p.y * scale * zoom,
        z: p.z
      };
    });
    
    // Sort faces (back-to-front)
    const sortedFaces = faces.map((face, index) => {
      const zSum = face.reduce((sum, vIdx) => sum + projected[vIdx].z, 0);
      return {
        indices: face,
        avgZ: zSum / face.length,
        originalIndex: index
      };
    }).sort((a, b) => b.avgZ - a.avgZ);
    
    const isConnected = this.connectService.isConnected();
    
    sortedFaces.forEach(faceData => {
      const idxs = faceData.indices;
      
      // Compute normal vector for flat shading
      const v3d = idxs.map(vIdx => {
        let p = this.rotateY(vertices[vIdx], this.crystalAngleY);
        return this.rotateX(p, this.crystalAngleX);
      });
      
      const ax = v3d[1].x - v3d[0].x;
      const ay = v3d[1].y - v3d[0].y;
      const az = v3d[1].z - v3d[0].z;
      
      const bx = v3d[2].x - v3d[0].x;
      const by = v3d[2].y - v3d[0].y;
      const bz = v3d[2].z - v3d[0].z;
      
      const nx = ay * bz - az * by;
      const ny = az * bx - ax * bz;
      const nz = ax * by - ay * bx;
      
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      const normalZ = nz / len;
      const factor = Math.max(0.1, (normalZ + 1) / 2);
      
      let r, g, b;
      if (isConnected) {
        r = Math.round(0 * (1 - factor) + 16 * factor);
        g = Math.round(219 * (1 - factor) + 185 * factor);
        b = Math.round(233 * (1 - factor) + 129 * factor);
      } else {
        r = Math.round(176 * (1 - factor) + 236 * factor);
        g = Math.round(198 * (1 - factor) + 178 * factor);
        b = Math.round(255 * (1 - factor) + 255 * factor);
      }
      
      const alpha = 0.15 + (1 - factor) * 0.15;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      
      ctx.beginPath();
      ctx.moveTo(projected[idxs[0]].x, projected[idxs[0]].y);
      for (let i = 1; i < idxs.length; i++) {
        ctx.lineTo(projected[idxs[i]].x, projected[idxs[i]].y);
      }
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = isConnected ? `rgba(0, 255, 200, ${0.4 + factor * 0.4})` : `rgba(176, 198, 255, ${0.3 + factor * 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    
    // Draw central glow
    ctx.beginPath();
    const coreGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 25);
    if (isConnected) {
      coreGlow.addColorStop(0, 'rgba(0, 255, 200, 0.8)');
      coreGlow.addColorStop(1, 'rgba(0, 219, 233, 0)');
    } else {
      coreGlow.addColorStop(0, 'rgba(236, 178, 255, 0.8)');
      coreGlow.addColorStop(1, 'rgba(176, 198, 255, 0)');
    }
    ctx.fillStyle = coreGlow;
    ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fill();
  }

  // Interactive Drag Mouse Handlers
  onCrystalMouseDown(e: MouseEvent) {
    this.isDraggingCrystal = true;
    this.mouseDragStart = { x: e.clientX, y: e.clientY };
  }

  onCrystalMouseMove(e: MouseEvent) {
    if (!this.isDraggingCrystal) return;
    const dx = e.clientX - this.mouseDragStart.x;
    const dy = e.clientY - this.mouseDragStart.y;
    
    // Apply spin speed
    this.crystalSpeedY = dx * 0.005;
    this.crystalSpeedX = dy * 0.005;
    
    this.crystalAngleY += dx * 0.01;
    this.crystalAngleX += dy * 0.01;
    
    this.mouseDragStart = { x: e.clientX, y: e.clientY };
  }

  onCrystalMouseUp() {
    this.isDraggingCrystal = false;
  }

  onCrystalMouseEnter() {
    this.crystalSpeedY = 0.015;
  }

  onCrystalMouseLeave() {
    this.isDraggingCrystal = false;
  }
}
