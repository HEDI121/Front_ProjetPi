import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import {  DossierMedical} from '../modelsdossier/dossierMedical';
import { catchError } from 'rxjs';
import {Observable , throwError } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
@Injectable({
  providedIn: 'root'
})
export class TablesServiceService {
  private urlBase ='http://localhost:9000/ProjetPi/dossiers';

  constructor(private http:HttpClient , private api : ApiserviceService ) { }


  getDossiers(){
    return this.http.get<DossierMedical[]>('http://localhost:9000/ProjetPi/dossiers/all').pipe(
      catchError(this.handleError)
    );
  }
  deleteDossiers(dm_id: number){
    return this.http.delete<DossierMedical[]>('${urlBase}/delete/${id}').pipe(
      catchError(this.handleError)
    );

  }

  getDossierForAuthenticatedUser(): Observable<DossierMedical> {
    const userId = this.api.getAuthenticatedUserId(); // Fetch authenticated user's ID
    const url ='${this.urlBase}/patient/${userId}';
    return this.http.get<DossierMedical>(url).pipe(
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

