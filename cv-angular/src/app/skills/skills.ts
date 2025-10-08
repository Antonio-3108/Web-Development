import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements OnInit {
  programmingLanguages: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.programmingLanguages = this.dataService.getProgrammingLanguajes();
  }
}
