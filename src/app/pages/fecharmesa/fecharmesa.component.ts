import { Component } from '@angular/core';
import { NavbarmesasComponent } from '../../layout/navbars/navbarmesas/navbarmesas.component';
import { NgFor } from '@angular/common';
import { MesaService } from '../../services/mesa.service';

@Component({
  selector: 'app-fecharmesa',
  standalone: true,
  imports: [NavbarmesasComponent, NgFor],
  templateUrl: './fecharmesa.component.html',
  styleUrl: './fecharmesa.component.css',
})
export class FecharmesaComponent {
  mesas: { id: number; nome: string }[] = [];

  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesas = this.mesaService.getMesas();
  }
}
