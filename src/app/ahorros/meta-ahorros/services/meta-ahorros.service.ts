import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaAhorroService {
  private apiUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) { }

  crearMeta(meta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/metas/`, meta);
  }

  listarMetas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/metas/`);
  }

  leerMeta(metaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metas/${metaId}`);
  }

  actualizarMeta(metaId: number, meta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/metas/${metaId}`, meta);
  }

  eliminarMeta(metaId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/metas/${metaId}`);
  }

}
