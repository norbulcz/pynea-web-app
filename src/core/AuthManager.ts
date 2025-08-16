export class AuthManager {
  private static instance: AuthManager;
  private isAuthenticated: boolean = false;

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  authenticate(): void {
    this.isAuthenticated = true;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  reset(): void {
    this.isAuthenticated = false;
  }
}
