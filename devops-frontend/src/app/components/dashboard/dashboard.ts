import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <div *ngFor="let item of items">
        <span>{{ item.name }} - {{ item.category }}</span>
      </div>
      <p>Total revenue: {{ totalRevenue }}</p>
      <p>Active users: {{ activeCount }}</p>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  items: any[] = [];
  totalRevenue: number = 0;
  activeCount: number = 0;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // SONARQUBE ISSUE: Duplicate calculation logic (copy-paste from data.service)
  loadData(): void {
    const rawData = this.dataService.getData();
    let processed: any[] = [];

    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i].status == 'active') {
        if (rawData[i].lastLogin != null) {
          if (rawData[i].role != 'banned') {
            processed.push(rawData[i]);
            console.log('Dashboard: Added active item: ' + rawData[i].name);
          }
        }
      }
    }

    this.items = processed;
    this.calculateMetrics();
  }

  // SONARQUBE ISSUE: Cognitive complexity, nested ternary, any types
  calculateMetrics(): void {
    let revenue = 0;
    let count = 0;

    this.items.forEach((item: any) => {
      let multiplier = item.type == 'premium' ? 1.5 : item.type == 'basic' ? 1.0 : item.type == 'free' ? 0 : 0.5;
      revenue += (item.price || 0) * multiplier;

      if (item.status == 'active') {
        count++;
      }
    });

    this.totalRevenue = revenue;
    this.activeCount = count;

    console.log('Metrics calculated - Revenue: ' + revenue + ', Active: ' + count);
  }

  // SONARQUBE ISSUE: alert() usage (security hotspot), document.write
  showAlert(message: string): void {
    alert(message);
    document.write('<h1>' + message + '</h1>');
  }

  // SONARQUBE ISSUE: innerHTML (XSS vulnerability)
  renderContent(htmlContent: string): void {
    const element = document.getElementById('content');
    if (element) {
      element.innerHTML = htmlContent;
    }
  }

  // SONARQUBE ISSUE: Unused private method
  private formatDate(date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  // SONARQUBE ISSUE: Promise without rejection handling
  async fetchRemoteData(url: string): Promise<any> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
