import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salaire } from '../model/salaire';
import { User } from '../model/User';
import { SalaireService } from '../services/salaire.service';

@Component({
  selector: 'app-salaire-details',
  templateUrl: './salaire-details.component.html',
  styleUrls: ['./salaire-details.component.scss']
})
export class SalaireDetailsComponent {
  salaireId: number;
  salaire: Salaire;

  constructor(private route: ActivatedRoute, private salaireService: SalaireService) { }

  ngOnInit(): void {
    this.salaireId = this.route.snapshot.params['id'];
    this.loadSalaireDetails();
  }

  loadSalaireDetails() {
    this.salaireService.getSalaireById(this.salaireId).subscribe(
      data => {
        this.salaire = data;
        console.log('Détails du salaire reçus:', this.salaire);
      },
      error => {
        console.error('Erreur lors du chargement des détails du salaire:', error);
      }
    );
  }

}
