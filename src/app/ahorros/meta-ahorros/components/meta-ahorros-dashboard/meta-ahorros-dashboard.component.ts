import { Component, OnInit } from '@angular/core';
import { MetaAhorrosService } from '../../services/meta-ahorros.service';
import { MetaAhorros } from '../../models/meta-ahorros';

@Component({
  selector: 'app-meta-ahorros-dashboard',
  templateUrl: './meta-ahorros-dashboard.component.html'
})
export class MetaAhorrosDashboardComponent implements OnInit {
  metas: MetaAhorros[] = [];

  constructor(private metaAhorrosService: MetaAhorrosService) {}

  ngOnInit(): void {
    this.loadMetas();
  }

  private loadMetas(): void {
    this.metas = this.metaAhorrosService.getMetas();
  }
}
