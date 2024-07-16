import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Conge } from '../model/conge';
import { User } from '../model/user';
import { CongeService } from '../services/conge.service';

@Component({
  selector: 'app-details-conge',
  templateUrl: './details-conge.component.html',
  styleUrls: ['./details-conge.component.scss']
})
export class DetailsCongeComponent {

  congeId: number;
  conge: Conge;
  user: User;

  constructor(private route: ActivatedRoute, private congeService: CongeService) { }

  ngOnInit(): void {
    this.congeId = this.route.snapshot.params['id'];
    this.loadCongeDetails();
  }

  loadCongeDetails() {
    this.congeService.getCongeById(this.congeId).subscribe(
      data => {
        this.conge = data;
        this.loadUserDetails(this.conge.users.username); // Assuming `users` is an object with a `username` property
      },
      error => {
        console.error('Erreur lors du chargement des détails du congé:', error);
      }
    );
  }

  loadUserDetails(username: string) {
    this.congeService.getUserByUsername(username).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Erreur lors du chargement des détails de l\'utilisateur:', error);
      }
    );
  }

  approveConge(id: number): void {
    this.congeService.approveConge(id).subscribe(
      updatedConge => this.conge = updatedConge,
      error => console.error('Erreur lors de l\'approbation du congé:', error)
    );
  }

  rejectConge(id: number): void {
    this.congeService.rejectConge(id).subscribe(
      updatedConge => this.conge = updatedConge,
      error => console.error('Erreur lors du rejet du congé:', error)
    );
  }
}
