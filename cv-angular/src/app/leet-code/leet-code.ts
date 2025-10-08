import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeetCodeService, UserProfile } from '../leet-code-service';

@Component({
  selector: 'app-leet-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leet-code.html',
  styleUrls: ['./leet-code.css']
})
export class LeetCodeComponent implements OnInit {
  profile: UserProfile | null = null;

  easyPercentage: number = 0;
  mediumPercentage: number = 0;
  hardPercentage: number = 0;

  circumference: number = 2 * Math.PI * 45;
  easyOffset: number = 0;
  mediumOffset: number = 0;
  hardOffset: number = 0;

  constructor(private leetCodeService: LeetCodeService) {}

  ngOnInit(): void {
    this.loadUserStats();
  }

  loadUserStats(): void {
    this.leetCodeService.getUserStats().subscribe(profile => {
      this.profile = profile;
      this.calculateChartData();
    });
  }

  calculateChartData(): void {
    if (!this.profile) return;

    const { easy, medium, hard } = this.profile.problemStats;

    // Calcular porcentajes
    this.easyPercentage = this.leetCodeService.calculatePercentage(
      easy.solved,
      this.profile.totalProblems
    );
    this.mediumPercentage = this.leetCodeService.calculatePercentage(
      medium.solved,
      this.profile.totalProblems
    );
    this.hardPercentage = this.leetCodeService.calculatePercentage(
      hard.solved,
      this.profile.totalProblems
    );


    this.easyOffset = this.circumference * (1 - this.easyPercentage / 100);

    const mediumStart = this.easyPercentage;
    this.mediumOffset = this.circumference * (1 - this.mediumPercentage / 100);

    const hardStart = this.easyPercentage + this.mediumPercentage;
    this.hardOffset = this.circumference * (1 - this.hardPercentage / 100);
  }

  formatRank(rank: number): string {
    if (rank >= 1000000) {
      return `~${(rank / 1000000).toFixed(0).replace(/\.0$/, '')},000,000`;
    } else if (rank >= 1000) {
      return `~${(rank / 1000).toFixed(0)},000`;
    }
    return `~${rank}`;
  }

  onVisitProfile(): void {
    console.log('Visitando perfil...');
  }
}
