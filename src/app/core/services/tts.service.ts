import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  private apiUrl = 'http://127.0.0.1:5000/api/tts';  // URL de tu API

  constructor(private http: HttpClient) {}

  convertTextToSpeech(text: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { text };

    return this.http.post<Blob>(this.apiUrl, body, { headers, responseType: 'blob' as 'json' });
  }
}