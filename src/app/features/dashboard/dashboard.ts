import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConnectService } from '../../core/services/connect.service';
import { LanguageService } from '../../core/services/language.service';

interface ValidatorNode {
  name: string;
  uptime: string;
  apy: number;
  staked: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public readonly connect = inject(ConnectService);
  public readonly lang = inject(LanguageService);

  // Staking states
  walletBalance = signal<number>(12450.75);
  stakedAmount = signal<number>(5000.00);
  claimableRewards = signal<number>(158.425);
  apiKey = 'sk_neural_live_a8f9d0c2e3b1474ea9e9a5c8df59f13';
  showApiKey = signal<boolean>(false);

  private rewardTimer: any;

  // Validator node statuses
  validators = signal<ValidatorNode[]>([
    { name: 'Validator Alpha (IAD1)', uptime: '99.98%', apy: 8.5, staked: 2000 },
    { name: 'Validator Beta (FRA2)', uptime: '99.95%', apy: 9.2, staked: 1500 },
    { name: 'Validator Delta (SIN1)', uptime: '100.00%', apy: 8.0, staked: 1500 }
  ]);

  ngOnInit() {
    // Simulate slow real-time staking interest increments (ticking up)
    this.rewardTimer = setInterval(() => {
      if (this.connect.isConnected()) {
        this.claimableRewards.update(current => current + 0.002);
      }
    }, 1500);
  }

  ngOnDestroy() {
    if (this.rewardTimer) {
      clearInterval(this.rewardTimer);
    }
  }

  toggleApiKey() {
    this.showApiKey.update(show => !show);
  }

  claimRewards() {
    const rewards = this.claimableRewards();
    if (rewards <= 0) return;

    this.walletBalance.update(bal => bal + rewards);
    this.claimableRewards.set(0);

    const successMsg = this.lang.currentLang() === 'vi' ? `Đã nhận thành công ${rewards.toFixed(3)} $NEURAL về ví!` :
                       this.lang.currentLang() === 'ko' ? `성공적으로 ${rewards.toFixed(3)} $NEURAL 리워드를 수령했습니다!` :
                       `Successfully claimed ${rewards.toFixed(3)} $NEURAL to your wallet!`;
    alert(successMsg);
  }

  triggerConnect() {
    this.connect.openModal();
  }
}
