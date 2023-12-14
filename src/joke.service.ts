// joke.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private readonly apiUrl = 'https://v2.jokeapi.dev/joke/Any?type=single';

  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<{ joke: string }> {
    return this.http.get<{ joke: string }>(this.apiUrl);
  }
}
