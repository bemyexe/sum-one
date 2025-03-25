class StorageService {
  static tokenKey = 'authToken';

  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  static clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

export default StorageService;
