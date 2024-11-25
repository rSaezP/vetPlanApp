// src/app/pages/agregar-mascota/agregar-mascota.page.ts
import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { AuthService } from '../../services/auth.service';
import { Mascota } from '../../models/mascota.model';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.page.html',
  styleUrls: ['./agregar-mascota.page.scss'],
})
export class AgregarMascotaPage implements OnInit {
  nombre: string = '';
  raza: string = '';
  edad: number = 0;
  usuarioId: string = '';
  especie: string = '';
  fechaNacimiento: string ='';


  constructor(
    private mascotaService: MascotaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserId().then((userId) => {
      this.usuarioId = userId ?? ''; // Usa una cadena vacía si userId es null
    }).catch((error) => {
      console.error('Error obteniendo el userId:', error);
    });
  }

  agregarMascota() {
    const nuevaMascota: Mascota = {
      nombre: this.nombre,
      especie: this.especie, // Asegúrate de que esta propiedad esté definida en el componente
      raza: this.raza,
      edad: this.edad,
      usuarioId: this.usuarioId,
      fechaNacimiento: this.fechaNacimiento // Asegúrate de manejar este valor en tu componente
    };
  
    this.mascotaService.crearMascota(nuevaMascota).then(() => {
      // Aquí podrías redirigir al usuario a la página de inicio o mostrar un mensaje de éxito
      console.log('Mascota creada exitosamente');
    }).catch((error) => {
      console.error('Error al crear la mascota:', error);
    });
  }
}
