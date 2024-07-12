import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpParams} from '@angular/common/http';
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
    return this.http.delete<DossierMedical[]>('${urlBase}/delete/${dm_id}').pipe(
      catchError(this.handleError)
    );

  }
  getPatientIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${this.urlBase}/id/${name}`).pipe(
      catchError(this.handleError)
    );
  }
  postDossier(patientId: number, dossier: DossierMedical) {
    const formData = new FormData();
    formData.append('rapport', dossier.rapport);
    formData.append('description', dossier.description);
    formData.append('dateCreation', dossier.dateCreation.toISOString());
    if (dossier.pdfFilePath) {
      formData.append('pdf',dossier.pdfFilePath);
    }

    return this.http.post<DossierMedical>(`${this.urlBase}/add/${patientId}`, formData).pipe(
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




    searchByRapport(rapport: string): Observable<DossierMedical[]> {
      let params = new HttpParams().set('rapport', rapport);
      return this.http.get<DossierMedical[]>(`${this.urlBase}/searchByrapport`, { params });
    }

    searchByDate(dateCreation: string): Observable<DossierMedical[]> {
      let params = new HttpParams().set('dateCreation', dateCreation);
      return this.http.get<DossierMedical[]>(`${this.urlBase}/searchBydate`, { params });
    }

    searchByKeyword(keyword: string): Observable<DossierMedical[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<DossierMedical[]>(`${this.urlBase}/search`, { params });
  }
}

