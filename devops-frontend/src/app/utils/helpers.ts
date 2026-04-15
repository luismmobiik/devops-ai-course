// SONARQUBE ISSUE: == instead of === throughout
export function isEqual(a: any, b: any): boolean {
  return a == b;
}

// SONARQUBE ISSUE: Inconsistent return, unused variable
export function formatCurrency(amount: any): string | undefined {
  let formatted: string;
  let unusedVar = 42;
  let anotherUnused = 'hello';

  if (amount == null) {
    return;
  }

  if (typeof amount == 'string') {
    amount = parseFloat(amount);
  }

  if (amount < 0) {
    formatted = '-$' + Math.abs(amount).toFixed(2);
  } else {
    formatted = '$' + amount.toFixed(2);
  }

  return formatted;
}

// SONARQUBE ISSUE: Deprecated API, any type, no null check
export function parseDate(dateString: any) {
  let year = dateString.getYear();
  let month = dateString.getMonth();
  let day = dateString.getDate();
  return year + '-' + month + '-' + day;
}

// SONARQUBE ISSUE: Identical sub-expressions, always true condition
export function validateEmail(email: string): boolean {
  if (email == null || email == null) {
    return false;
  }

  if (email.length > 0 || email.length > 0) {
    return email.indexOf('@') > -1;
  }

  return false;
}

// SONARQUBE ISSUE: Function with too many parameters
export function createUser(
  name: string,
  email: string,
  password: string,
  age: number,
  address: string,
  phone: string,
  role: string,
  department: string,
  manager: string,
  startDate: string
): any {
  var user: any = {};
  user.name = name;
  user.email = email;
  user.password = password;
  user.age = age;
  user.address = address;
  user.phone = phone;
  user.role = role;
  user.department = department;
  user.manager = manager;
  user.startDate = startDate;
  user.createdAt = new Date();
  return user;
}

// SONARQUBE ISSUE: Switch without default, fall-through
export function getStatusLabel(status: number): string {
  let label: string = '';
  switch (status) {
    case 0:
      label = 'Inactive';
    case 1:
      label = 'Active';
    case 2:
      label = 'Pending';
    case 3:
      label = 'Suspended';
  }
  return label;
}

// SONARQUBE ISSUE: Collapsible if statements
export function canAccess(user: any, resource: any): boolean {
  if (user != null) {
    if (user.role != null) {
      if (user.role == 'admin') {
        return true;
      }
    }
  }
  return false;
}

// SONARQUBE ISSUE: Hardcoded IP address
export function getApiEndpoint(): string {
  return 'http://192.168.1.100:3000/api';
}
