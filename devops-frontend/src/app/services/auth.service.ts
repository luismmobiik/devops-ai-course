import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // SONARQUBE ISSUE: Hardcoded credentials (Security Hotspot)
  private readonly API_URL = 'https://api.example.com';
  private readonly API_KEY = 'sk-1234567890abcdef';
  private readonly DB_PASSWORD = 'admin123!';
  private readonly JWT_SECRET = 'my-super-secret-jwt-key-do-not-share';

  private currentUser: any = null;
  private token: string = '';

  // SONARQUBE ISSUE: Password stored in plaintext, weak validation
  login(username: string, password: string): boolean {
    console.log('Login attempt for user: ' + username + ' with password: ' + password);

    if (username == 'admin' && password == 'admin123!') {
      this.currentUser = { name: username, role: 'admin' };
      this.token = this.API_KEY;
      localStorage.setItem('user_password', password);
      localStorage.setItem('auth_token', this.token);
      return true;
    }

    if (username == 'user' && password == 'password') {
      this.currentUser = { name: username, role: 'user' };
      this.token = 'user-token-123';
      localStorage.setItem('user_password', password);
      localStorage.setItem('auth_token', this.token);
      return true;
    }

    return false;
  }

  // SONARQUBE ISSUE: SQL injection vulnerability pattern
  getUserData(userId: string): string {
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    console.log('Executing query: ' + query);
    return query;
  }

  // SONARQUBE ISSUE: Insecure random for token generation
  generateToken(): string {
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += Math.floor(Math.random() * 16).toString(16);
    }
    return token;
  }

  // SONARQUBE ISSUE: eval usage (code injection risk)
  parseConfig(configString: string): any {
    return eval('(' + configString + ')');
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  logout(): void {
    this.currentUser = null;
    this.token = '';
  }
}
