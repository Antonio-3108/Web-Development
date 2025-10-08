import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Header} from './header/header';
import {DarkModeToggle} from './dark-mode-toggle/dark-mode-toggle';

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, DarkModeToggle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cv-angular');
}
