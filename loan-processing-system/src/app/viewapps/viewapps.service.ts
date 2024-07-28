import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  applicationId: number;
  applicantName: string;
  submittedDate: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewappsService {
  private apiUrl = 'https://localhost:8080/appl'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }
  getApplicationById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
