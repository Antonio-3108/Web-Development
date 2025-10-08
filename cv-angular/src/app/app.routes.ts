import { Routes } from '@angular/router';
import { Skills } from './skills/skills';
import { Experience } from './experience/experience';
import { Home } from './home/home';
import { ExperienceTable } from './experience-table/experience-table';
import { EducationTable } from './education-table/education-table';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'skills', component: Skills },
    { path: 'experience', component: Experience,
        children: [
            { path: 'jobs', component: ExperienceTable },
            { path: 'studies', component: EducationTable }
        ]
     }
];
