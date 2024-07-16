import { Component } from '@angular/core';
import { Conge } from '../model/conge';
import { CongeService } from '../services/conge.service';

@Component({
  selector: 'app-conge-list',
  templateUrl: './conge-list.component.html',
  styleUrls: ['./conge-list.component.scss']
})
export class CongeListComponent {
  conges: Conge[] = [];
  searchTerm: string = '';

  constructor(private congeService: CongeService) { }

  ngOnInit(): void {
    this.loadConges();
  }

  loadConges(): void {
    this.congeService.getAllConges().subscribe(
      (data: Conge[]) => {
        this.conges = data;
      },
      (error) => {
        console.error('Error fetching congés', error);
      }
    );
  }

  deleteConge(id: number): void {
    this.congeService.deleteConge(id).subscribe(() => {
      this.conges = this.conges.filter(conge => conge.congeId !== id);
    });
  }

  // Filtrer les congés en fonction du terme de recherche
  get filteredConges(): Conge[] {
    return this.conges.filter(conge =>
      //conge.dateDebut.includes(this.searchTerm.toLowerCase()) ||
      //conge.dateFin.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      conge.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
