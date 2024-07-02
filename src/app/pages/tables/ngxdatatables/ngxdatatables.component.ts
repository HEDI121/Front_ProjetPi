import { Component, OnInit } from "@angular/core";
import { DossierMedical } from "src/app/model/dossierMedical";
import { TablesServiceService } from "src/app/services/tables-service.service";
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
  constructor(private ts : TablesServiceService){this.temp = this.listdossiers.map((prop, key) => {
    return {
      ...prop,
      id: key};
    });
  }
  
  ngOnInit (){
    this.ts.getDossiers().subscribe(
    (data : DossierMedical[])=>{this.listdossiers=data ;
      this.temp =[...this.listdossiers];},
      error => {
        console.error("erreur lors du chargement des dossiers:" , error)
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
