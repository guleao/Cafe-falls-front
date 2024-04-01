import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NavbarlistaComponent } from '../../layout/navbars/navbarlista/navbarlista.component';

@Component({
  selector: 'app-entradalista',
  standalone: true,
  templateUrl: './entradalista.component.html',
  styleUrl: './entradalista.component.css',
  imports: [NavbarlistaComponent, FormsModule],
})
export class EntradalistaComponent {
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
  termoDePesquisa: any;

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
