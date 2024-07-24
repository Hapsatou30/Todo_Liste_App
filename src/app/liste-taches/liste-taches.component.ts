import { Component } from '@angular/core'; // Importation du décorateur Component pour définir un composant Angular
import { FormsModule } from '@angular/forms'; // Importation de FormsModule pour les fonctionnalités de formulaire et la liaison avec ngModel
import { CommonModule } from '@angular/common'; // Importation de CommonModule pour utiliser des directives communes comme *ngFor et *ngIf

@Component({
  selector: 'app-liste-taches', // Sélecteur du composant pour l'utiliser dans le template HTML
  standalone: true, // Indique que ce composant est autonome et n'a pas besoin d'être déclaré dans un NgModule
  imports: [FormsModule, CommonModule], // Déclaration des modules nécessaires pour ce composant
  templateUrl: './liste-taches.component.html', // Chemin vers le template HTML du composant
  styleUrls: ['./liste-taches.component.css'] // Chemin vers le fichier CSS du composant
})
export class ListeTachesComponent {
  // Tableau pour stocker les tâches ajoutées, avec chaque tâche ayant un titre et une description
  taches: { titre: string, description: string }[] = [];
  

  // Objet pour stocker la nouvelle tâche à ajouter
  nouvelleTache = { titre: '', description: '' };

  // Méthode pour ajouter une nouvelle tâche au tableau des tâches
  ajouterTache() {
    // Vérifie que le titre et la description ne sont pas vides
    if (this.nouvelleTache.titre && this.nouvelleTache.description) {
      // Ajoute la nouvelle tâche au tableau des tâches en utilisant l'opérateur de déstructuration
      this.taches.push({ ...this.nouvelleTache });
      // Réinitialise le formulaire en vidant les champs de la nouvelle tâche
      this.nouvelleTache = { titre: '', description: '' };
    }
  }
}
