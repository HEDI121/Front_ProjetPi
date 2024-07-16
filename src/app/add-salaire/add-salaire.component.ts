import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Salaire } from '../model/salaire';
import { User } from '../model/User';
import { SalaireService } from '../services/salaire.service';

@Component({
  selector: 'app-add-salaire',
  templateUrl: './add-salaire.component.html',
  styleUrls: ['./add-salaire.component.scss']
})
export class AddSalaireComponent  {
  salaireForm: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private salaireService: SalaireService
  ) { }

  ngOnInit(): void {
    this.salaireForm = this.formBuilder.group({
      username: ['', Validators.required],
      montant: ['', Validators.required],
      date_paiement: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.salaireForm.invalid) {
      return;
    }

    const { username, montant, date_paiement } = this.salaireForm.value;

    // Recherchez l'utilisateur par username
    this.salaireService.getUserByUsername(username).subscribe(

      user => {
        this.user = user; // Stockez l'utilisateur récupéré
        const salaire: Salaire = { montant, date_paiement, users: this.user };

        // Ajoutez le salaire avec l'utilisateur récupéré
        this.salaireService.addSalaireToUser(username, salaire).subscribe(
          response => {
            console.log('Salaire ajouté avec succès', response);
            this.salaireForm.reset();
          },
          error => {
            console.error('Erreur lors de l\'ajout du salaire', error);
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
