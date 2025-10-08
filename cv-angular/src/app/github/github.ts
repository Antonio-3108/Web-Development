import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GithubService } from '../github-service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-github',
  imports: [CommonModule],
  templateUrl: './github.html',
  styleUrl: './github.css'
})
export class Github implements OnInit {
  repos: any[] = [];
  currentIndex = 0;
  visibleCards = 2;
  isLoading = true;
  private isBrowser: boolean;

  constructor(
    private githubService: GithubService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateVisibleCards();

    if (this.isBrowser) {
      window.addEventListener('resize', () => this.updateVisibleCards());
    }

    this.githubService.getRepos().pipe(
      catchError(error => {
        console.error('Error fetching GitHub repos:', error);
        return of([]);
      })
    ).subscribe(data => {
      this.repos = data.filter((repo: any) => !repo.fork && !repo.private);
      this.isLoading = false;
    });
  }

  updateVisibleCards(): void {
    if (!this.isBrowser) {
      this.visibleCards = 2;
      return;
    }

    const width = window.innerWidth;
    if (width <= 480) {
      this.visibleCards = 1;
    } else {
      this.visibleCards = 2;
    }
  }

  nextSlide(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
    }
  }

  get visibleRepos(): any[] {
    const start = this.currentIndex * this.visibleCards;
    const end = start + this.visibleCards;
    return this.repos.slice(start, end);
  }

  get totalSlides(): number {
    return Math.max(1, Math.ceil(this.repos.length / this.visibleCards));
  }

  get maxIndex(): number {
    return this.totalSlides - 1;
  }

  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f7df1e',
      'TypeScript': '#3178c6',
      'Python': '#3776ab',
      'Java': '#ed8b00',
      'C++': '#00599c',
      'C#': '#239120',
      'PHP': '#777bb4',
      'Ruby': '#cc342d',
      'Go': '#00add8',
      'Rust': '#dea584',
      'Swift': '#fa7343',
      'Kotlin': '#7f52ff',
      'HTML': '#e34c26',
      'CSS': '#1572b6',
      'Vue': '#4fc08d',
      'Angular': '#dd0031',
      'React': '#61dafb',
      'Node.js': '#339933'
    };
    return colors[language] || '#6f42c1';
  }
}
