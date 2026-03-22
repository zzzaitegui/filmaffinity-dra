import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FilmCard } from '../film-card/film-card';
import { Film } from '../film';
import { FilmService } from '../films';

@Component({
  selector: 'app-home',
  imports: [FilmCard],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Buscar por título" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Buscar</button>
      </form>
    </section>
    <section class="results">
      @for (film of filteredFilmList; track $index) {
        <app-film-card [film]="film" />
      }
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  filmList: Film[] = [];
  filteredFilmList: Film[] = [];
  filmService: FilmService = inject(FilmService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    this.filmService.getAllFilms().subscribe((data: any[]) => {
      this.filmList = data.map((p: any) => ({
        id: p.id,
        titulo: p.titulo,
        fechaEstreno: p.fechaEstreno,
        enlace: p.enlace,
      }));
      this.filteredFilmList = this.filmList;
      this.cdr.detectChanges();
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredFilmList = this.filmList;
      return;
    }
    this.filteredFilmList = this.filmList.filter(film =>
      film.titulo.toLowerCase().includes(text.toLowerCase()) ||
      film.fechaEstreno.split('-')[2].includes(text)
    );
  }
}