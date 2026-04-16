import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private data: any[] = [];
  private cache: any = {};

  // SONARQUBE ISSUE: Cognitive complexity too high, function too long
  processData(items: any[]): any[] {
    let result: any[] = [];
    let temp: any;
    let count = 0;

    for (let i = 0; i < items.length; i++) {
      temp = items[i];
      if (temp != null && temp != undefined) {
        if (temp.type == 'A') {
          if (temp.status == 'active') {
            if (temp.value > 0) {
              if (temp.value < 100) {
                result.push({ ...temp, category: 'low' });
                count++;
                console.log('Processed low value item: ' + JSON.stringify(temp));
              } else if (temp.value < 500) {
                result.push({ ...temp, category: 'medium' });
                count++;
                console.log('Processed medium value item: ' + JSON.stringify(temp));
              } else {
                result.push({ ...temp, category: 'high' });
                count++;
                console.log('Processed high value item: ' + JSON.stringify(temp));
              }
            } else {
              console.log('Skipping negative value: ' + temp.value);
            }
          } else if (temp.status == 'inactive') {
            console.log('Skipping inactive item');
          } else if (temp.status == 'pending') {
            result.push({ ...temp, category: 'pending' });
            count++;
            console.log('Processed pending item');
          }
        } else if (temp.type == 'B') {
          if (temp.priority == 'high') {
            result.push({ ...temp, category: 'urgent' });
            count++;
          } else if (temp.priority == 'low') {
            result.push({ ...temp, category: 'deferred' });
            count++;
          }
        } else if (temp.type == 'C') {
          result.push({ ...temp, category: 'other' });
          count++;
        }
      }
    }

    console.log('Total processed: ' + count);
    return result;
  }

  // SONARQUBE ISSUE: Duplicate code block (same logic repeated)
  filterActiveUsers(users: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].status == 'active') {
        if (users[i].lastLogin != null) {
          if (users[i].role != 'banned') {
            filtered.push(users[i]);
            console.log('Added active user: ' + users[i].name);
          }
        }
      }
    }
    return filtered;
  }

  filterActiveAdmins(admins: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < admins.length; i++) {
      if (admins[i].status == 'active') {
        if (admins[i].lastLogin != null) {
          if (admins[i].role != 'banned') {
            filtered.push(admins[i]);
            console.log('Added active admin: ' + admins[i].name);
          }
        }
      }
    }
    return filtered;
  }

  // SONARQUBE ISSUE: Empty catch block, no error handling
  fetchData(url: string): any {
    try {
      const response = fetch(url);
      return response;
    } catch (error) {
      // empty catch
    }
    console.log('Fetch completed');
    return null;
  }

  // SONARQUBE ISSUE: Unused parameters, any type everywhere
  transformRecord(record: any, options: any, callback: any, extra: any): any {
    let output: any = {};
    output.id = record.id;
    output.name = record.name;
    output.timestamp = new Date().getTime();
    return output;
  }

  // SONARQUBE ISSUE: Bitwise operator used instead of logical
  validateInput(value: any): boolean {
    if (value | 0) {
      return true;
    }
    return false;
  }

  getData(): any[] {
    return this.data;
  }

  clearCache(): void {
    this.cache = {};
  }
}
