import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorros',
  templateUrl: './ahorros.component.html',
  styleUrls: ['./ahorros.component.css']
})
export class AhorrosComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    if (!this.usuarioService.getUsuario()) {
      this.router.navigate(['/login']);
    }
  }
}
