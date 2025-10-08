import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private apiUrl = 'https://api.github.com/users/Antonio-3108/repos';

  constructor(private http: HttpClient) {
  }

  getRepos(): Observable<any> {
    const params = new HttpParams()
      .set('sort', 'updated')
      .set('per_page', '30')
      .set('type', 'public');
    
    return this.http.get<any>(this.apiUrl, { params });
  }
}
