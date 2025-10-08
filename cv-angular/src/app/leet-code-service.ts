import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ProblemStats {
  easy: {
    solved: number;
    total: number;
  };
  medium: {
    solved: number;
    total: number;
  };
  hard: {
    solved: number;
    total: number;
  };
}

export interface UserProfile {
  totalSolved: number;
  totalProblems: number;
  attempting: number;
  rank: number;
  problemStats: ProblemStats;
}

@Injectable({
  providedIn: 'root'
})
export class LeetCodeService {

  constructor() { }

  getUserStats(): Observable<UserProfile> {
    const profile: UserProfile = {
      totalSolved: 1,
      totalProblems: 3706,
      attempting: 0,
      rank: 5000000,
      problemStats: {
        easy: {
          solved: 1,
          total: 905
        },
        medium: {
          solved: 0,
          total: 1927
        },
        hard: {
          solved: 0,
          total: 874
        }
      }
    };

    return of(profile);
  }

  calculatePercentage(solved: number, total: number): number {
    return total > 0 ? (solved / total) * 100 : 0;
  }
  calculateAngle(solved: number, total: number): number {
    return this.calculatePercentage(solved, total) * 3.6;
  }
}
