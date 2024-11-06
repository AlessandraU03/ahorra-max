import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) { }

  creargasto(gasto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gastos/`, gasto);
  }

  listargastos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gastos/`);
  }

  leergasto(gastoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gastos/${gastoId}`);
  }

  actualizargasto(gastoId: number, gasto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/gastos/${gastoId}`, gasto);
  }

  eliminargasto(gastoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/gastos/${gastoId}`);
  }

}
