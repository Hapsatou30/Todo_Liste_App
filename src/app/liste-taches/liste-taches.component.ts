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

  // Tableau de tâches avec des titres, des descriptions et une propriété 'completed'
  taches: { titre: string, description: string, completed: boolean }[] = [];
  
  // Objet représentant une nouvelle tâche à ajouter
  nouvelleTache = { titre: '', description: '', completed: false };

  // Méthode pour ajouter une nouvelle tâche au tableau des tâches
  ajouterTache() {
    if (this.nouvelleTache.titre && this.nouvelleTache.description) {
      // Ajout de la nouvelle tâche au tableau
      this.taches.push({ ...this.nouvelleTache });
  
      // Afficher l'alerte après l'ajout
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'La tâche a été ajoutée',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Réinitialisation de l'objet nouvelleTache
      this.nouvelleTache = { titre: '', description: '', completed: false };
    }
  }
  

  // Méthode pour marquer une tâche comme terminée
  toggleCompleted(tache: { titre: string, description: string, completed: boolean }) {
    tache.completed = !tache.completed;
  
    // Afficher l'alerte après avoir marqué la tâche comme terminée
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: tache.completed ? 'La tâche est maintenant terminée' : 'La tâche est maintenant non terminée',
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  // Propriétés calculées pour séparer les tâches terminées et non terminées
  get tachesNonTerminees() {
    return this.taches.filter(tache => !tache.completed);
  }

  get tachesTerminees() {
    return this.taches.filter(tache => tache.completed);
  }
}
