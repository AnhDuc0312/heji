import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { ConnectService } from '../../core/services/connect.service';

@Component({
  selector: 'app-landing-a',
  imports: [RouterLink],
  templateUrl: './landing-a.html',
  styleUrl: './landing-a.scss'
})
export class LandingAComponent {
  public readonly lang = inject(LanguageService);
  private readonly connectService = inject(ConnectService);
  
  parallaxTransform = 'translateY(0px)';

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.pageYOffset;
    this.parallaxTransform = `translateY(${scrolled * 0.4}px)`;
  }

  onMouseMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
