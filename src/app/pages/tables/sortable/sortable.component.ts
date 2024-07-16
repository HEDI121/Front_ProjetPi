import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from "src/app/servicedossier/mailservice.service";


@Component({
  selector: 'app-mail',
  templateUrl: "sortable.component.html",
  //styleUrls: ['./mail.component.css']
})
export class SortableComponent implements OnInit {

  emailRequest = {
    to: '',
    subject: '',
    body: ''
  };

  constructor(private emailService: MailService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.emailService.sendEmail(this.emailRequest).subscribe(
      response => {
        console.log('Email sent successfully:', response);
        // Réinitialisez les champs ou affichez un message de confirmation
      },
      error => {
        console.error('Failed to send email:', error);
        // Affichez un message d'erreur à l'utilisateur
      }
    );
  }

}