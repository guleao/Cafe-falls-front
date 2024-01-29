import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Login } from '../../models/login-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    LoginService
  ]
})
export class LoginComponent {

  loginService = inject(LoginService);

  loginC: Login = new Login();

  constructor(private router: Router) { }

  login() {
    
    console.log(this.login);
    this.loginService.save(this.loginC).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.mensagem == "Email inválido") {
        alert("Email/Senha inválido");
      }
      else if (resultData.mensagem == "Senha inválida") {
        alert("Email/Senha Inválida");
      }
      else if (resultData.mensagem == "Login realizado com sucesso" && resultData.admin == true) {
        this.router.navigateByUrl('');
      }
      else if (resultData.mensagem == "Login realizado com sucesso" && resultData.admin == false) {
        this.router.navigateByUrl('');
      }
      else if (resultData.mensagem == "Login Inválido") {
        alert("Login inválido");
      }
    });
  }
}
