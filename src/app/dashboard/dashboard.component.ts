import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CongeService } from '../services/conge.service';
import { SalaireService } from '../services/salaire.service';
import {User} from '../model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  totalSalaire: number = 0;
  averageSalaire: number = 0;
  totalConges: number = 0;
  approvedConges: number = 0;
  rejectedConges: number = 0;
  panConges: number = 0;
  users: User[] = [];

  constructor(
    private router: Router,
    private salaireService: SalaireService,
    private congeService: CongeService
  ) { }

  ngOnInit(): void {
    this.loadSalaireStats();
    this.loadCongeStats();
    this.loadUsers();
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  loadSalaireStats() {
    this.salaireService.getTotalSalaireByUsername('oussama').subscribe(
      total => this.totalSalaire = total,
      error => console.error('Erreur lors du chargement du total des salaires:', error)
    );
    this.salaireService.getAverageSalaireByUsername('oussama').subscribe(
      average => this.averageSalaire = average,
      error => console.error('Erreur lors du chargement de la moyenne des salaires:', error)
    );
  }

  loadCongeStats() {
    this.congeService.getAllConges().subscribe(
      conges => {
        this.totalConges = conges.length;
        this.approvedConges = conges.filter(conge => conge.status === 'Approved').length;
        this.rejectedConges = conges.filter(conge => conge.status === 'REJECTED').length;
        this.panConges = conges.filter(conge => conge.status === 'PENDING').length;
      },
      error => console.error('Erreur lors du chargement des congés:', error)
    );
  }

  loadUsers() {
    this.congeService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => console.error('Erreur lors du chargement des utilisateurs:', error)
    );
  }
}
