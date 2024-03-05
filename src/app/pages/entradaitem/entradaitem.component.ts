import { Component } from '@angular/core';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entradaitem',
  standalone: true,
  imports: [NavbarlistaComponent, FormsModule],
  templateUrl: './entradaitem.component.html',
  styleUrl: './entradaitem.component.css',
})
export class EntradaitemComponent {
  formulario = new FormGroup({
    campo1: new FormControl(''),
  });

  nome = '';
  descricao = '';
  fornecedor = '';
  infoadicional = '';
  codigo = '';
  quantidade = '';
  preco_compra = '';
  data = '';
  validade = '';
  preco_venda = '';

  onSubmit(): void {
    console.log({
      nome: this.nome,
      descricao: this.descricao,
      fornecedor: this.fornecedor,
      infoadicional: this.infoadicional,
      codigo: this.codigo,
      quantidade: this.quantidade,
      preco_compra: this.preco_compra,
      data: this.data,
      validade: this.validade,
      preco_venda: this.preco_venda,
    });
  }
}
