import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  readonly isModalOpen = signal<boolean>(false);
  readonly isConnecting = signal<boolean>(false);
  readonly isConnected = signal<boolean>(false);
  readonly connectionProgress = signal<number>(0);
  readonly activeWallet = signal<string | null>(null);
  readonly logs = signal<string[]>([]);

  openModal() {
    if (this.isConnected()) return;
    this.isModalOpen.set(true);
    this.isConnecting.set(false);
    this.connectionProgress.set(0);
    this.logs.set([]);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  disconnect() {
    this.isConnected.set(false);
    this.activeWallet.set(null);
    this.connectionProgress.set(0);
    this.logs.set([]);
  }

  connectWallet(walletName: string) {
    if (this.isConnecting()) return;
    this.isConnecting.set(true);
    this.connectionProgress.set(0);
    this.logs.set([]);

    const logMessages = [
      `Initializing handshake with ${walletName}...`,
      'Requesting cryptographic signature...',
      'Verifying account balance & state...',
      'Establishing secure tunnel over neural link...',
      'Synchronizing workspace cache...'
    ];

    let currentStep = 0;
    
    // Add first log
    this.addLog(logMessages[0]);

    const interval = setInterval(() => {
      const currentProgress = this.connectionProgress();
      if (currentProgress < 100) {
        const nextProgress = Math.min(100, currentProgress + 20);
        this.connectionProgress.set(nextProgress);
        
        currentStep++;
        if (currentStep < logMessages.length) {
          this.addLog(logMessages[currentStep]);
        }

        if (nextProgress === 100) {
          clearInterval(interval);
          this.isConnected.set(true);
          // Generate mock address
          const randomHex = Math.random().toString(16).substring(2, 6);
          this.activeWallet.set(`${walletName.substring(0, 4)}...${randomHex}`);
          this.addLog(`Connection established successfully! Address: 0x${Math.random().toString(16).substring(2, 10)}...`);
          
          // Auto close modal after a brief delay
          setTimeout(() => {
            this.closeModal();
          }, 1200);
        }
      }
    }, 400);
  }

  private addLog(message: string) {
    this.logs.update(current => [...current, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }
}
