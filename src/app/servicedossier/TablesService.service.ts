import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {  DossierMedical} from '../modelsdossier/dossierMedical';
import { catchError, tap } from 'rxjs';
import {Observable , throwError } from 'rxjs';
import { ApiserviceService } from '../services/apiservice.service';
@Injectable({
  providedIn: 'root'
})
export class TablesServiceService {
  private urlBase ='http://localhost:9000/ProjetPi/dossiers';
  pdfBase64: string;

  constructor(private http:HttpClient , private api : ApiserviceService ) { }


  getDossiers(){
    return this.http.get<DossierMedical[]>('http://localhost:9000/ProjetPi/dossiers/all').pipe(
      catchError(this.handleError)
    );
  }
  deleteDossiers(dm_id: number){
    return this.http.delete<DossierMedical[]>('${this.urlBase}/delete/${dm_id}').pipe(
      catchError(this.handleError)
    );

  }
  getPatientIdByName(name: string): Observable<number> {
    console.log(`Fetching patient ID for name: ${name}`);
    return this.http.get<number>(`${this.urlBase}/id/${name}`).pipe(
      tap((response) => console.log('Received response:', response)),
      catchError((error) => {
        console.error('Error fetching patient ID', error);
        return throwError(error);
      })
    );
  }

  getDossiersByUserId(userId: number): Observable<DossierMedical[]> {
    return this.http.get<DossierMedical[]>(`${this.urlBase}/patient/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

 /* postDossier(patientId: number, dossier: DossierMedical) {
    const formData = new FormData();
    formData.append('rapport', dossier.rapport);
    formData.append('description', dossier.description);

    if (dossier.dateCreation instanceof Date) {
        formData.append('dateCreation', dossier.dateCreation.toISOString());
    } else {
        formData.append('dateCreation', new Date(dossier.dateCreation).toISOString());
    }

    if (dossier.pdfFilePath instanceof File) {
        formData.append('pdf', dossier.pdfFilePath);
    } else {
        console.error('pdfFilePath is not a valid File object');
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No authentication token found');
        alert('You are not authenticated. Please log in again.');
        return throwError('No authentication token found');
    }

    console.log('Using token:', token);

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    console.log('Sending request with headers:', headers);

    return this.http.post<DossierMedical>(`${this.urlBase}/add/${patientId}`, formData, { headers }).pipe(
        catchError(this.handleError)
    );
}
*/
private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
        console.error('Unauthorized request:', error.message);
       // alert('You are not authorized. Please log in again.');
        // Optionally, redirect to login page
    } else {
        console.error('An error occurred:', error.message);
    }
    return throwError('Something bad happened; please try again later.');
}

  
  

   postDossier(patientId: number, dossier: DossierMedical) {
   

    return this.http.post<DossierMedical>(`${this.urlBase}/add/${patientId}`, {
      "rapport": dossier.rapport,
      "description":dossier.description,
      "date_creation": dossier.dateCreation.getDate,
      "pdfFilePath":""

  }).pipe(
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

