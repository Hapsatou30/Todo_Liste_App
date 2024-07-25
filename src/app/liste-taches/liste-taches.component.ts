// Importation des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Importation de la bibliothèque SweetAlert2 pour les alertes
import Swal from 'sweetalert2';

@Component({
  // Sélecteur du composant
  selector: 'app-liste-taches',
  standalone: true,
  // Importation des modules nécessaires pour ce composant
  imports: [FormsModule, CommonModule],
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.css']
})
export class ListeTachesComponent {

  // Tableau pour stocker les tâches
  taches: { titre: string, description: string, completed: boolean }[] = [];
  
  // Objet pour stocker les informations de la nouvelle tâche
  nouvelleTache = { titre: '', description: '', completed: false };
  
  // Terme de recherche pour filtrer les tâches
  searchTerm: string = '';

  // Méthode pour ajouter une nouvelle tâche
  ajouterTache() {
    // Vérification que le titre et la description ne sont pas vides
    if (!this.nouvelleTache.titre || !this.nouvelleTache.description) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Le titre et la description sont obligatoires.',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    // Vérification que le titre et la description ne contiennent pas de chiffres
    const regex = /^[^0-9]*$/;
    if (!regex.test(this.nouvelleTache.titre) || !regex.test(this.nouvelleTache.description)) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Le titre et la description ne doivent pas contenir de chiffres.',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    // Vérification que la description ne dépasse pas 100 caractères
    if (this.nouvelleTache.description.length > 100 || this.nouvelleTache.titre.length > 100){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Le titre et la description ne doivent pas dépasser 100 caractères.',
        showConfirmButton: false,
        timer: 1000
      });
      return;
    }

    // Si toutes les validations passent, ajoutez la tâche au tableau des tâches
    this.taches.push({ ...this.nouvelleTache });
    /*
    ou bien utiliser ça 
    this.taches.push({
    titre: this.nouvelleTache.titre,
    description: this.nouvelleTache.description,
    completed: this.nouvelleTache.completed
    });

    */
    
    // Réinitialisation de la nouvelle tâche
    this.nouvelleTache = { titre: '', description: '', completed: false };
    
    // Affichage d'un message de succès
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Votre tâche a été ajoutée',
      showConfirmButton: false,
      timer: 1000
    });
  }

 // Méthode pour marquer une tâche comme terminée ou non terminée
tacheTerminee(tache: { titre: string, description: string, completed: boolean }) {
  // Enregistrer l'état initial de la tâche
  const etatInitial = tache.completed;

  // Basculer l'état de complétion
  tache.completed = !tache.completed;

  // Vérifier si la tâche est maintenant marquée comme terminée
  if (!etatInitial && tache.completed) {
    // Affichage d'un message de succès uniquement si la tâche est maintenant terminée
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tâche marquée comme terminée',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

  // Getter pour récupérer les tâches non terminées
  get tachesNonTerminees() {
    return this.taches.filter(tache => !tache.completed);
  }

  // Getter pour récupérer les tâches terminées
  get tachesTerminees() {
    return this.taches.filter(tache => tache.completed);
  }

  // Méthode pour filtrer les tâches non terminées en fonction du terme de recherche
  filteredTachesNonTerminees() {
    return this.tachesNonTerminees.filter(tache =>
      tache.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Méthode pour filtrer les tâches terminées en fonction du terme de recherche
  filteredTachesTerminees() {
    return this.tachesTerminees.filter(tache =>
      tache.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
