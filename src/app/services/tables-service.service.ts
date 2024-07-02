import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { DossierMedical } from '../model/dossierMedical';
import { catchError } from 'rxjs';
import {Observable , throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TablesServiceService {

  constructor(private http:HttpClient) { }


  getDossiers(){
    return this.http.get<DossierMedical[]>('http://localhost:9000/ProjetPi/dossiers/all').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      console.error('An error occurred:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
 /* addUser(U: Post){
    this.http.post('http://localhost:3000/post' , p);
  }*/
}

