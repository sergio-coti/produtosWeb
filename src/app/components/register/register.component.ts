import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  //variáveis
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  erroSenha: string = '';

  //método construtor
  constructor(private httpClient: HttpClient) {}

  //programando a estrutura do formulário
  //resgatar cada campo preenchido no formulário
  form = new FormGroup({

    nome : new FormControl('', [
      Validators.required, 
      Validators.minLength(8)]),

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    senha : new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),

    senhaConfirmacao : new FormControl('', [
      Validators.required
    ])
  });

  //função para verificar se os campos do formulário
  //possuem algum erro de validação
  get f() {
    return this.form.controls;
  }

  //função para capturar o submit do formulário
  submit() {

    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.erroSenha = '';

    //verificando se as senhas estão iguais
    if(this.form.value.senha == this.form.value.senhaConfirmacao) {
      
        //fazendo a requisição POST para a API
        this.httpClient
          .post(environment.apiUsuarios + '/usuarios/criar', this.form.value)
          .subscribe({
            next: (data: any) => { //capturar a resposta de sucesso
              //exibir mensagem de sucesso na página
              this.mensagemSucesso = `Parabéns ${data.nome}, sua conta foi criada com sucesso.`;
              //limpar os campos do formulário
              this.form.reset();
            },
            error: (e) => { //capturar a resposta de erro
              //exibindo mensagem de erro na página
              this.mensagemErro = e.error.errors[0];
            }
          });      
    }
    else {
      this.erroSenha = 'Senhas não conferem, por favor verifique.';
    }    
  }

}
