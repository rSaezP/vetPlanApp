// register.page.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importar Router para la redirección
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  role = '';
  
  // Variables para los mensajes de error
  nameError = '';
  emailError = '';
  passwordError = '';
  roleError = '';
  
  private emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(private authService: AuthService,
    private router: Router,
    private navCtrl: NavController) {}

  validateName() {
    if (!this.name) {
      this.nameError = 'El nombre es requerido';
      return false;
    }
    if (this.name.length < 3) {
      this.nameError = 'El nombre debe tener al menos 3 caracteres';
      return false;
    }
    this.nameError = '';
    return true;
  }

  validateEmail() {
    if (!this.email) {
      this.emailError = 'El correo es requerido';
      return false;
    }
    if (!this.emailPattern.test(this.email)) {
      this.emailError = 'Ingrese un correo válido';
      return false;
    }
    this.emailError = '';
    return true;
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'La contraseña es requerida';
      return false;
    }
    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  validateRole() {
    if (!this.role) {
      this.roleError = 'Debe seleccionar un rol';
      return false;
    }
    this.roleError = '';
    return true;
  }

  isFormValid(): boolean {
    return this.validateName() && 
          this.validateEmail() && 
          this.validatePassword() && 
          this.validateRole();
  }

  async register() {
    if (!this.isFormValid()) {
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.name, this.role);
      alert('Usuario registrado con éxito');
      // redirigir al login
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Error en el registro: ' + (error as any).message);
    }
  }
}