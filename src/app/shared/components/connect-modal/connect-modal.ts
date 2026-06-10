import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectService } from '../../../core/services/connect.service';
import { LanguageService } from '../../../core/services/language.service';

interface WalletOption {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-connect-modal',
  imports: [CommonModule],
  templateUrl: './connect-modal.html',
  styleUrl: './connect-modal.scss'
})
export class ConnectModalComponent {
  public readonly connect = inject(ConnectService);
  public readonly lang = inject(LanguageService);

  readonly wallets: WalletOption[] = [
    { name: 'MetaMask', icon: 'account_balance_wallet', color: 'from-[#f6851b] to-[#e2761b]' },
    { name: 'WalletConnect', icon: 'sync_alt', color: 'from-[#3b99fc] to-[#2b86e8]' },
    { name: 'Coinbase Wallet', icon: 'grid_view', color: 'from-[#0052ff] to-[#0045d9]' },
    { name: 'Phantom', icon: 'insights', color: 'from-[#ab9ff2] to-[#7f6ff0]' }
  ];

  selectWallet(walletName: string) {
    this.connect.connectWallet(walletName);
  }

  close() {
    this.connect.closeModal();
  }
}
