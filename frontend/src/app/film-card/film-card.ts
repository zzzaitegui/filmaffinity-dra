import { Component, input } from '@angular/core';
import { Film } from '../film';

@Component({
  selector: 'app-film-card',
  template: `
    <section class="film-card">
      <div class="film-day" [style.color]="getMonthColor(film().fechaEstreno)">
        {{ getDay(film().fechaEstreno) }}
      </div>
      <h2 class="film-title">{{ film().titulo }}</h2>
      <p class="film-date">🎬 Estreno: {{ film().fechaEstreno }}</p>
      <a [href]="film().enlace" target="_blank">Más información</a>
    </section>
  `,
  styleUrls: ['./film-card.css'],
})
export class FilmCard {
  film = input.required<Film>();

  getDay(fecha: string): string {
    return fecha.split('-')[2];
  }

  getMonthColor(fecha: string): string {
    const month = parseInt(fecha.split('-')[1]);
    const colors: Record<number, string> = {
      1:  '#F44336', // Enero     - Red
      2:  '#E91E63', // Febrero   - Pink
      3:  '#9C27B0', // Marzo     - Purple
      4:  '#3F51B5', // Abril     - Indigo
      5:  '#03A9F4', // Mayo      - Light Blue
      6:  '#009688', // Junio     - Teal
      7:  '#4CAF50', // Julio     - Green
      8:  '#CDDC39', // Agosto    - Lime
      9:  '#FF9800', // Septiembre- Orange
      10: '#FF5722', // Octubre   - Deep Orange
      11: '#795548', // Noviembre - Brown
      12: '#00BCD4', // Diciembre - Cyan
    };
    return colors[month] ?? '#BB86FC';
  }
}