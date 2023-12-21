import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css'
})
export class ProdutoCadastroComponent implements OnInit {

  //variáveis
  categorias: any[] = []; //lista de categorias
  fornecedores: any[] = []; //lista de fornecedores

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient
  ){}

  //criando o formulário para capturar os campos
  form = new FormGroup({
    nome : new FormControl(''),
    preco: new FormControl(''),
    quantidade: new FormControl(''),
    idFornecedor: new FormControl(''),
    idCategoria: new FormControl('')
  });

  ngOnInit(): void {
    
    //consultar as categorias na API
    this.httpClient.get(environment.apiProdutos + "/categorias")
      .subscribe({
        next: (data) => { //capturar a resposta de sucesso
          //armazenando a lista recebida de categorias da API
          this.categorias = data as any[]; 
        }
      });

    //consultando os fornecedores na API
    this.httpClient.get(environment.apiProdutos + "/fornecedores")
      .subscribe({
        next: (data) => { //capturar a resposta de sucesso
          //armazenando a lista recebida de categorias da API
          this.fornecedores = data as any[]; 
        }
      });
  }

  //função executada no momento do
  //submit do formulário
  submit() {
    
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.post(environment.apiProdutos + "/produtos", this.form.value)
      .subscribe({
        next: (data: any) => { //recebendo a resposta de sucesso
          this.mensagemSucesso = `Produto ${data.nome}, cadastrado com sucesso.`;
          this.form.reset(); //limpar os campos do formulário
        },
        error: (e) => {
          this.mensagemErro = 'Erro ao cadastrar o produto.';
          console.log(e);
        }
      });
  }

}
