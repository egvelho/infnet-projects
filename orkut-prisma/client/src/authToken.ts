const tokenKey = "token";

export class AuthToken {
  static get() {
    const token = localStorage.getItem(tokenKey);
    return token;
  }

  static set(nextToken: string) {
    localStorage.setItem(tokenKey, nextToken);
  }

  static remove() {
    localStorage.removeItem(tokenKey);
  }
}
