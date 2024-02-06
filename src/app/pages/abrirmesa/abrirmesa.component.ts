import { Component } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-abrirmesa',
  standalone: true,
  imports: [NavbarmesasComponent, NgFor],
  templateUrl: './abrirmesa.component.html',
  styleUrl: './abrirmesa.component.css',
})
export class AbrirmesaComponent {
  mesas: { id: number; nome: string }[] = [];

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesas = this.mesaService.getMesas();
  }
}
