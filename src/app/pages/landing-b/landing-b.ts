import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-b',
  standalone: true,
  imports: [],
  templateUrl: './landing-b.html',
  styleUrl: './landing-b.scss'
})
export class LandingBComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('crystal') crystalRef!: ElementRef<HTMLElement>;
  @ViewChild('heroGlow') heroGlowRef!: ElementRef<HTMLElement>;

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
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.initParticles();
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
}
