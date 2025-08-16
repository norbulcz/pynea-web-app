import { AccessCodeDomain } from '@/domain/AccessCodeDomain';
import { AuthManager } from '@/core/AuthManager';
import { WelcomeState } from '@/types';

export class WelcomeController {
  private state: WelcomeState = {
    accessCode: '',
    error: null,
    isLoading: false,
  };

  private onStateChange: ((state: WelcomeState) => void) | null = null;
  private onNavigate: ((path: string) => void) | null = null;
  private authManager = AuthManager.getInstance();

  setStateChangeCallback(callback: (state: WelcomeState) => void): void {
    this.onStateChange = callback;
  }

  setNavigateCallback(callback: (path: string) => void): void {
    this.onNavigate = callback;
  }

  updateAccessCode(code: string): void {
    this.state.accessCode = code;
    this.state.error = null;
    this.notifyStateChange();
  }

  validateAccessCode(): void {
    this.state.isLoading = true;
    this.notifyStateChange();

    // Simulate async validation
    setTimeout(() => {
      const validation = AccessCodeDomain.validateAccessCode(this.state.accessCode);
      
      if (validation.isValid) {
        this.state.error = null;
        this.state.isLoading = false;
        this.notifyStateChange();
        this.authManager.authenticate();
        this.navigateToDashboard();
      } else {
        this.state.error = 'Invalid access code. Please try again.';
        this.state.isLoading = false;
        this.notifyStateChange();
      }
    }, 500);
  }

  private navigateToDashboard(): void {
    if (this.onNavigate) {
      this.onNavigate('/dashboard');
    }
  }

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange({ ...this.state });
    }
  }

  getState(): WelcomeState {
    return { ...this.state };
  }
}
