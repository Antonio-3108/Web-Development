import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../data-service';
import { DurationRangePipe } from '../duration-range-pipe';

@Component({
  selector: 'app-experience-table',
  imports: [CommonModule, DurationRangePipe],
  templateUrl: './experience-table.html',
  styleUrl: './experience-table.css'
})
export class ExperienceTable implements OnInit, AfterViewInit {
  
  isExpanded = false;
  companies: string[] = [];
  experiences: Array<{start: string, end?: string, company: string, position: string}> = [];
  
  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/experience/jobs')) {
      this.isExpanded = true;
    }
    this.companies = this.dataService.getjobCompanies();
    
    // Datos de experiencia con fechas
    this.experiences = [
      {
        start: '2024-06-01',
        end: '2024-07-01',
        company: 'SISAP',
        position: 'Pasantía'
      },
      {
        start: '2025-02-01',
        company: 'Google',
        position: 'Desarrollador de Software'
      }
    ];
  }

  ngAfterViewInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/experience/jobs')) {
      this.isExpanded = true;
    }
  }
}
