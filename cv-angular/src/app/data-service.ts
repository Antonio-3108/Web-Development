import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private programmingLanguages = ['Python', 'C', 'C++', 'PostgreSQL'];
  private companies = ['SISAP', 'Google'];
  
  getProgrammingLanguajes() {
    return this.programmingLanguages;
  }
  
  getjobCompanies() {
    return this.companies;
  }
}
