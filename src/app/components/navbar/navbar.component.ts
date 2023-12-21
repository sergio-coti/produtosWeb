import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  //variáveis
  usuarioAutenticado: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //função executada sempre que o componente
  //for aberto na página
  ngOnInit(): void {

    //ler os dados contidos na local storage
    const dados = localStorage.getItem('auth-user');
    if(dados != null) {

      //capturar o conteudo da local storage
      var usuario = JSON.parse(dados);

      //capturando os dados para o componente
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;

      this.usuarioAutenticado = true;
    }
  }

  //função para realizar o logout do usuário
  logout(): void {
    if(confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados gravados na local storage
      localStorage.removeItem('auth-user');

      //redirecionar para a página de login do sistema
      location.href = '/app/login';
    }
  }

}
