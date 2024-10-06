import { Injectable } from '@angular/core';
import { MetaAhorros } from '../models/meta-ahorros';

@Injectable({
  providedIn: 'root'
})
export class MetaAhorrosService {
  private metas: MetaAhorros[] = [];

  constructor() { 
    this.loadMetas();
  }

  saveMeta(meta: MetaAhorros): void {
    this.metas.push(meta);
    localStorage.setItem('metas', JSON.stringify(this.metas));
  }

  getMetas(): MetaAhorros[] {
    return this.metas;
  }

  private loadMetas(): void {
    const metas = localStorage.getItem('metas');
    if (metas) {
      this.metas = JSON.parse(metas);
    }
  }
}
