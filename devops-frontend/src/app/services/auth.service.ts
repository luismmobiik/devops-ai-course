import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // SONARQUBE ISSUE: Hardcoded credentials (Security Hotspot)
  private readonly API_URL = 'https://api.example.com';
  private readonly AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
  private readonly AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
  private readonly GITHUB_TOKEN = 'ghp_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef12';
  private readonly SLACK_WEBHOOK = 'https://hooks.slack.example.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
  private readonly SENDGRID_API_KEY = 'SG.fakekey0000000000000000000000000.00000000000000000000000000000000000000000000';
  private readonly DB_PASSWORD = 'admin123!';

  private currentUser: any = null;
  private token: string = '';

  // SONARQUBE ISSUE: Password stored in plaintext, weak validation
  login(username: string, password: string): boolean {
    console.log('Login attempt for user: ' + username + ' with password: ' + password);

    if (username == 'admin' && password == 'admin123!') {
      this.currentUser = { name: username, role: 'admin' };
      this.token = this.GITHUB_TOKEN;
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
