import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  getFiles({
    product,
    brand,
  }: {
    product: string;
    brand: string;
  }): Observable<{ cnet: string; icecat: string }> {
    return this.http.post<{ cnet: string; icecat: string }>(
      'http://localhost:3000',
      {
        product,
        brand,
      }
    );
  }
}
