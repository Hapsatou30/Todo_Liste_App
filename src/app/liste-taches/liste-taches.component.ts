import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-taches',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.css']
})
export class ListeTachesComponent {

  taches: { titre: string, description: string, completed: boolean }[] = [];
  nouvelleTache = { titre: '', description: '', completed: false };
  searchTerm: string = ''; // Ajoutez cette propriété

  ajouterTache() {
    if (this.nouvelleTache.titre && this.nouvelleTache.description) {
      this.taches.push({ ...this.nouvelleTache });
      this.nouvelleTache = { titre: '', description: '', completed: false };
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Votre tâche a été ajoutée',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  toggleCompleted(tache: { titre: string, description: string, completed: boolean }) {
    tache.completed = !tache.completed;

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tâche marquée comme terminée',
      showConfirmButton: false,
      timer: 1500
    });
  }

  get tachesNonTerminees() {
    return this.taches.filter(tache => !tache.completed);
  }

  get tachesTerminees() {
    return this.taches.filter(tache => tache.completed);
  }

  // Méthodes pour filtrer les tâches en fonction du terme de recherche
  filteredTachesNonTerminees() {
    return this.tachesNonTerminees.filter(tache =>
      tache.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filteredTachesTerminees() {
    return this.tachesTerminees.filter(tache =>
      tache.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
