import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarvendasComponent } from '../../layout/navbars/navbarvendas/navbarvendas.component';
import { FormsModule } from '@angular/forms';
import { ListaComponent } from '../lista/lista.component';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-menuestoque',
  standalone: true,
  imports: [
    NavbarvendasComponent,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ListaComponent,
    CommonModule,
  ],
  templateUrl: './menuestoque.component.html',
  styleUrl: './menuestoque.component.css',
})
export class MenuestoqueComponent {
  modalEditarInstance: any;
  constructor(private elementRef: ElementRef) {}

  @ViewChild('modalEditar') modalEditar!: ElementRef;

  ngAfterViewInit() {
    if (this.elementRef.nativeElement) {
      this.modalEditarInstance = new bootstrap.Modal(
        this.modalEditar.nativeElement
      );
    } else {
      console.error('elementRef.nativeElement não está definido');
    }
  }

  OpenModalPerca() {
    const modelDiv = document.getElementById('modalPerca');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModalPerca() {
    const modelDiv = document.getElementById('modalPerca');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
}
