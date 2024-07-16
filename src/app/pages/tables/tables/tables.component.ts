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
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  entries: number = 10;
  selected: any[] = [];
  temp : DossierMedical[] =[] ;;
  activeRow: any;
  listdossiers: DossierMedical[] = [
  ];

  @ViewChild(PopupComponent) popup: PopupComponent;
  showFilters: boolean = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
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
  constructor(private ts: TablesServiceService){this.temp = this.listdossiers.map((prop, key) => {
    return {
      ...prop,
      id: key};
    });
  }


  ngOnInit() {
    // Appel initial pour charger les dossiers par userID
    this.loadDossiersByUserId();
  }
  userId: number = 1;
  loadDossiersByUserId() {

    this.ts.getDossiersByUserId(this.userId).subscribe(
      dossiers => {
        this.listdossiers = dossiers;
        console.log('Dossiers chargés:', this.listdossiers);
      },
      error => {
        console.error('Erreur lors du chargement des dossiers', error);
      }
    );
  }



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
