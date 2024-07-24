import { Component } from '@angular/core';
//importation de notre composant
import { ListeTachesComponent } from './liste-taches/liste-taches.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListeTachesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-do-list';
}
