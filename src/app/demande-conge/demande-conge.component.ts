import { Component } from '@angular/core';
import { Conge } from '../model/conge';
import { CongeService } from '../services/conge.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.scss']
})
export class DemandeCongeComponent {
  congeForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private congeService: CongeService
    // Injectez le service d'utilisateur ici
  ) { }

  ngOnInit(): void {
    this.congeForm = this.formBuilder.group({
      username: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.congeForm.invalid) {
      return;
    }

    const { username, dateDebut, dateFin } = this.congeForm.value;

    // Recherchez l'utilisateur par username
    this.congeService.getUserByUsername(username).subscribe(
      user => {
        this.user = user; // Stockez l'utilisateur récupéré
        const conge: Conge = { dateDebut, dateFin, status: 'PENDING', users: this.user };

        // Ajoutez le congé avec l'utilisateur récupéré
        this.congeService.addConge(username, conge).subscribe(
          response => {
            console.log('Congé ajouté avec succès', response);
            this.congeForm.reset();
          },
          error => {
            console.error('Erreur lors de l\'ajout du congé', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
        // Gérez l'erreur ici, par exemple affichez un message d'erreur à l'utilisateur
      }
    );
  }
}
