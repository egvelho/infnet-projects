const tokenPath = "token";

export class AuthToken {
  static get() {
    return localStorage.getItem(tokenPath);
  }

  static set(token: string) {
    localStorage.setItem(tokenPath, token);
  }

  static remove() {
    localStorage.removeItem(tokenPath);
  }
}
