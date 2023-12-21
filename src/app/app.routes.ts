import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProdutoCadastroComponent } from './components/produto-cadastro/produto-cadastro.component';
import { ProdutoConsultaComponent } from './components/produto-consulta/produto-consulta.component';
import { ProdutoEdicaoComponent } from './components/produto-edicao/produto-edicao.component';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: '/app/login'
    },
    {
        path: 'app/login',
        component: LoginComponent
    },
    {
        path: 'app/register',
        component: RegisterComponent
    },
    {
        path: 'app/produto-cadastro',
        component: ProdutoCadastroComponent
    },
    {
        path: 'app/produto-consulta',
        component: ProdutoConsultaComponent
    },
    {
        path: 'app/produto-edicao',
        component: ProdutoEdicaoComponent
    }
];
