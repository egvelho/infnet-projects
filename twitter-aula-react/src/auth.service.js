export class AuthService {
  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static removeToken() {
    localStorage.removeItem("token");
  }
}
