import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EditarMascotaModalComponent } from '../../components/editar-mascota-modal/editar-mascota-modal.component';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  mascotas: Mascota[] = [];
  userName: string = 'Usuario'; // Valor por defecto

  constructor(
    private modalController: ModalController,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarDatosUsuario();
    this.cargarMascotas();
  }
  async cargarDatosUsuario() {
    try {
      this.userName = await this.authService.getUserName();
    } catch (error) {
      console.error('Error al cargar el nombre del usuario:', error);
    }
  }
  async cargarMascotas() {
    const userId = await this.authService.getUserId();
    if (userId) {
      this.mascotaService.obtenerMascotasPorUsuarioId(userId)
        .subscribe(mascotas => {
          this.mascotas = mascotas;
        });
    }
  }

  async abrirModalEdicion(mascota: Mascota) {
    const modal = await this.modalController.create({
      component: EditarMascotaModalComponent,
      componentProps: {
        mascota: { ...mascota }
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.cargarMascotas();
    }
  }
  // Añade este nuevo método
  async eliminarMascota(mascota: Mascota) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro que deseas eliminar a ${mascota.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              if (mascota.id) {
                await this.mascotaService.eliminarMascota(mascota.id);
                console.log('Mascota eliminada exitosamente');
                
                // Forzar la recarga de las mascotas
                await this.cargarMascotas();
                
                // Mostrar mensaje de éxito
                const successAlert = await this.alertController.create({
                  header: 'Éxito',
                  message: 'La mascota ha sido eliminada correctamente',
                  buttons: ['OK']
                });
                await successAlert.present();
              }
            } catch (error) {
              console.error('Error al eliminar mascota:', error);
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo eliminar la mascota. Por favor, intenta nuevamente.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  
}