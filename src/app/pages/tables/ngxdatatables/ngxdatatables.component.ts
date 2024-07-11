import { Component, OnInit } from "@angular/core";
import { DossierMedical } from "src/app/modelsdossier/dossierMedical";
import { TablesServiceService } from "src/app/servicedossier/TablesService.service";
import {  ViewChild } from '@angular/core';
import { PopupComponent } from "src/app/pages/tables/popup/popup.component"; 
export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}
@Component({
  selector: "app-ngxdatatables",
  templateUrl: "ngxdatatables.component.html"
})
export class NgxDatatablesComponent implements OnInit {
  entries: number = 10;
  selected: any[] = [];
  temp : DossierMedical[] =[] ;;
  activeRow: any;
  listdossiers: DossierMedical[] = [
  ];

  @ViewChild(PopupComponent) popup: PopupComponent;

  ngAfterViewInit() {
    // Ensures ViewChild is initialized
  }

  openPopup() {
    if (this.popup) {
      this.popup.openPopup();
    } else {
      console.error('PopupComponent is not initialized.');
    }
  }
  constructor(private ts: TablesServiceService){
    /*this.temp = this.listdossiers.map((prop, key) => {
    return {
      ...prop,
      id: key};
    });*/
  }

  ngOnInit(): void {
    this.loadDossiers();
  }

  loadDossiers(): void {
    this.ts.getDossiers().subscribe(
      (data: DossierMedical[]) => {
        console.log('Données chargées:', data);  // Ajoutez ce journal pour débogage
        this.listdossiers = data;
        this.temp = [...this.listdossiers];
      },
      error => {
        console.error("Erreur lors du chargement des dossiers:", error);
      }
    );
  }
 
 /* ngOnInit (){
    this.ts.getDossiers().subscribe(
    (data : DossierMedical[])=>{this.listdossiers=data ;
      this.temp =[...this.listdossiers];},
      error => {
        console.error("erreur lors du chargement des dossiers:" , error)
      }

  );
};*/
  deleteDossier(dm_id: number): void {
  this.ts.deleteDossiers(dm_id).subscribe(
    (response) => {
      console.log('Dossier supprimé avec succès', response);
      // Vous pouvez ajouter ici toute logique pour mettre à jour l'interface utilisateur après la suppression
    },
    (error) => {
      console.error('Erreur lors de la suppression du dossier', error);
      // Vous pouvez ajouter ici toute logique pour gérer les erreurs, par exemple afficher un message à l'utilisateur
    }
  )
};





  SelectionType = SelectionType;

 
  entriesChange($event) {
    this.entries = $event.target.value;
  }
/* filterTable($event) {
    let val = $event.target.value;
    this.temp = this.listdossiers.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }*/
    filterTable($event) {
      let val = $event.target.value.toLowerCase();
      this.temp = this.listdossiers.filter(d => {
        return Object.values(d).some(value =>
          typeof value === "string" && value.toLowerCase().includes(val)
        );
      });
    }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onActivate(event) {
    this.activeRow = event.row;
  }

}
function deleteDossier(id: any, number: any) {
  throw new Error("Function not implemented.");
}

