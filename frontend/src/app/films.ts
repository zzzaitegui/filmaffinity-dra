import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiUrl = 'http://localhost:8080/api/peliculas';

  constructor(private http: HttpClient) {}

  getAllFilms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}