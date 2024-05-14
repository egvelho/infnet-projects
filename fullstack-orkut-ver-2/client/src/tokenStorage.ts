const tokenPath = "token";

export abstract class TokenStorage {
  static getToken() {
    return localStorage.getItem(tokenPath);
  }

  static setToken(token: string) {
    localStorage.setItem(tokenPath, token);
  }

  static removeToken() {
    localStorage.removeItem(tokenPath);
  }
}
