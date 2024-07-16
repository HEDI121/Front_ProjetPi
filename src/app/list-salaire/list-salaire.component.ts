import { Component } from '@angular/core';
import { Salaire } from '../model/salaire';
import { SalaireService } from '../services/salaire.service';

@Component({
  selector: 'app-list-salaire',
  templateUrl: './list-salaire.component.html',
  styleUrls: ['./list-salaire.component.scss']
})
export class ListSalaireComponent {
  salaires: Salaire[] = [];

  constructor(private salaireService: SalaireService) { }

  ngOnInit(): void {
    this.loadSalaires();
  }

  loadSalaires() {
    this.salaireService.getAllSalaries().subscribe(
      (salaires) => {
        this.salaires = salaires;
        console.log('Salaires:', this.salaires); // Vérifiez les données reçues
      },
      (error) => {
        console.error('Error fetching salaries', error);
      }
    );
  }

  deleteSalaire(id: number) {
    if (id === undefined || id === null) {
      console.error('ID is undefined or null');
      return;
    }

    console.log(`Deleting salaire with ID: ${id}`);

    this.salaireService.supprimerSalaire(id).subscribe(
      () => {
        this.salaires = this.salaires.filter(salaire => salaire.Salaire_id !== id);
        console.log(`Salaire avec l'ID ${id} a été supprimé avec succès`);
      },
      (error) => {
        console.error(`Erreur lors de la suppression du salaire avec l'ID ${id}`, error);
      }
    );
  }

}
