class StorageService {
  static tokenKey = 'authToken';
  static userIdKey = 'userId';
  static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  static clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  static setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  static getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  static clearUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }
}

export default StorageService;
