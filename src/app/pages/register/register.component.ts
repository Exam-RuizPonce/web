import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequest } from '../../models/userRequest.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        contact_number: [ // Cambiado a contact_number
          '',
          [Validators.required, Validators.pattern(/^\d{9}$/)]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  // Validador para verificar si las contraseñas coinciden
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('password_confirmation')?.value;
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSubmit(): void {
    // Verifica si el formulario es válido
    if (this.registerForm.invalid) {
      console.log(this.registerForm)
      alert("El formulario debe estar completo");
      return; // Detenemos si el formulario es inválido
    }
  
    // Obtén los valores del formulario
    const formValue = this.registerForm.value;
  
    // Verifica si las contraseñas coinciden (aunque ya lo haga el validador, puedes agregarlo aquí para debug)
    if (formValue.password !== formValue.password_confirmation) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  
    // Si pasa la validación, preparar el objeto para el servicio
    const userRequest: UserRequest = {
      nombre: formValue.name,
      numeroDeContacto: formValue.contact_number,
      email: formValue.email,
      password: formValue.password
    };

    // Llamada al servicio para registrar al usuario
    this.userService.registerUser(userRequest).subscribe({
      next: (response) => {
        alert('Registro exitoso. Redirigiendo al inicio de sesión.');
        localStorage.setItem('user', JSON.stringify(response)); // Guardar el usuario en el almacenamiento local
        this.router.navigate(['/dashboard']); // Redirigir a la página de inicio de sesión
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Hubo un error al procesar el registro.');
      }
    });
  }
}
