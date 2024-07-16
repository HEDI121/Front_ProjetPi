import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DossierMedical } from 'src/app/modelsdossier/dossierMedical';
import { TablesServiceService } from 'src/app/servicedossier/TablesService.service';
import { PopupComponent } from 'src/app/pages/tables/popup/popup.component';

@Component({
  selector: 'app-ngxdatatables',
  templateUrl: 'ngxdatatables.component.html',
})
export class NgxDatatablesComponent implements OnInit, AfterViewInit {
  entries: number = 10;
  selected: any[] = [];
  temp: DossierMedical[] = [];
  activeRow: any;
  listdossiers: DossierMedical[] = [];

  @ViewChild(PopupComponent) popup: PopupComponent;

  showFilters: boolean = false;

  constructor(private ts: TablesServiceService) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  ngAfterViewInit() {
    // Ensures ViewChild is initialized
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  openPopup() {
    this.popup.openPopup();
    setTimeout(() => {
      const popupElement = document.getElementById('popupElement');
      if (popupElement) {
        popupElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  loadDossiers(): void {
    this.ts.getDossiers().subscribe(
      (data: DossierMedical[]) => {
        console.log('Données chargées:', data);
        this.listdossiers = data;
        this.temp = [...this.listdossiers];
      },
      error => {
        console.error('Erreur lors du chargement des dossiers:', error);
      }
    );
  }

  deleteDossier(dm_id: number): void {
    this.ts.deleteDossiers(dm_id).subscribe(
      response => {
        console.log('Dossier supprimé avec succès', response);
        // Refresh the list after deletion
        this.loadDossiers();
      },
      error => {
        console.error('Erreur lors de la suppression du dossier', error);
      }
    );
  }

  searchByRapport(event: any): void {
    const rapport = event.target.value;
    if (rapport) {
      this.ts.searchByRapport(rapport).subscribe(data => {
        this.listdossiers = data;
      });
    } else {
      this.loadDossiers();
    }
  }

  searchByDate(event: any): void {
    const dateCreation = event.target.value;
    if (dateCreation) {
      this.ts.searchByDate(dateCreation).subscribe(data => {
        this.listdossiers = data;
      });
    } else {
      this.loadDossiers();
    }
  }

  searchByKeyword(event: any): void {
    const keyword = event.target.value;
    if (keyword) {
      this.ts.searchByKeyword(keyword).subscribe(data => {
        this.listdossiers = data;
      });
    } else {
      this.loadDossiers();
    }
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.temp = this.listdossiers.filter(d => {
      return Object.values(d).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(val)
      );
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }
}
