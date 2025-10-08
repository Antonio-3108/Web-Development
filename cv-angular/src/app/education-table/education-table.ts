import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-table',
  imports: [CommonModule],
  templateUrl: './education-table.html',
  styleUrl: './education-table.css'
})
export class EducationTable implements OnInit, AfterViewInit {
  
  isExpanded = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/experience/studies')) {
      this.isExpanded = true;
    }
  }

  ngAfterViewInit() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/experience/studies')) {
      this.isExpanded = true;
    }
  }
}
