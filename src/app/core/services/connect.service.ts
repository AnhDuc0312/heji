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

  isMetaMaskAvailable(): boolean {
    return typeof window !== 'undefined' && !!(window as any).ethereum;
  }

  isPhantomAvailable(): boolean {
    return typeof window !== 'undefined' && !!(window as any).solana;
  }

  async connectWallet(walletName: string, simulate: boolean = false) {
    if (this.isConnecting()) return;
    this.isConnecting.set(true);
    this.connectionProgress.set(10);
    this.logs.set([]);

    this.addLog(`Initializing handshake with ${walletName}...`);

    if (simulate) {
      this.runSimulation(walletName);
      return;
    }

    try {
      let address = '';
      if (walletName === 'MetaMask') {
        if (!this.isMetaMaskAvailable()) {
          throw new Error('MetaMask extension is not installed.');
        }
        this.addLog('Requesting account access from MetaMask...');
        this.connectionProgress.set(30);
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.connectionProgress.set(70);
        if (accounts && accounts.length > 0) {
          const addr = accounts[0];
          address = `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
          this.addLog(`MetaMask linked. Address: ${addr}`);
        } else {
          throw new Error('No accounts found.');
        }
      } else if (walletName === 'Phantom') {
        if (!this.isPhantomAvailable()) {
          throw new Error('Phantom extension is not installed.');
        }
        this.addLog('Requesting connection from Phantom...');
        this.connectionProgress.set(30);
        const resp = await (window as any).solana.connect();
        this.connectionProgress.set(70);
        const pubkey = resp.publicKey.toString();
        address = `${pubkey.substring(0, 4)}...${pubkey.substring(pubkey.length - 4)}`;
        this.addLog(`Phantom linked. Public Key: ${pubkey}`);
      } else {
        this.runSimulation(walletName);
        return;
      }

      this.connectionProgress.set(100);
      this.isConnected.set(true);
      this.activeWallet.set(address);
      this.addLog('Connection established successfully!');
      
      setTimeout(() => {
        this.closeModal();
      }, 1200);

    } catch (err: any) {
      this.addLog(`[ERROR] Connection failed: ${err.message || err}`);
      this.connectionProgress.set(0);
      this.isConnecting.set(false);
    }
  }

  private runSimulation(walletName: string) {
    const logMessages = [
      'Simulating handshake over neural link...',
      'Generating mock cryptographic signature...',
      'Verifying mock account balance & state...',
      'Establishing secure tunnel over simulated socket...',
      'Synchronizing simulated workspace cache...'
    ];

    let currentStep = 0;
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
          const randomHex = Math.random().toString(16).substring(2, 6);
          this.activeWallet.set(`${walletName.substring(0, 4)}...${randomHex}`);
          this.addLog(`Simulated connection established successfully!`);
          
          setTimeout(() => {
            this.closeModal();
          }, 1200);
        }
      }
    }, 350);
  }

  private addLog(message: string) {
    this.logs.update(current => [...current, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }
}
