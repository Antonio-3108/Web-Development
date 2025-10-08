import { Component } from '@angular/core';
import { Skills } from '../skills/skills';
import { EducationTable } from '../education-table/education-table';
import { ExperienceTable } from '../experience-table/experience-table';
import {Github} from '../github/github';
import {LeetCodeComponent} from '../leet-code/leet-code';

@Component({
  selector: 'app-home',
  imports: [Skills, EducationTable, ExperienceTable, Github, LeetCodeComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
