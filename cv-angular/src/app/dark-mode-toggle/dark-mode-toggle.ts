import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [CommonModule],
  templateUrl: './dark-mode-toggle.html',
  styleUrl: './dark-mode-toggle.css'
})
export class DarkModeToggle implements OnInit, OnDestroy {
  isDarkMode = false;
  private subscription: Subscription = new Subscription();

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del modo oscuro
    this.subscription.add(
      this.darkModeService.isDarkMode$.subscribe(isDark => {
        this.isDarkMode = isDark;
      })
    );
  }

  ngOnDestroy(): void {
    // Limpiar suscripción
    this.subscription.unsubscribe();
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
