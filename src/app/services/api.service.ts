import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  
 getCharacters(term: string = '', page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/?page=${page}&name=${term}`;
    return this.http.get<any>(url);
  }
}