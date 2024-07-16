import { Component } from '@angular/core';
import { Conge } from '../model/conge';
import { CongeService } from '../services/conge.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.scss']
})
export class AddCongeComponent {

  
  constructor(private congeService: CongeService) {}
}
