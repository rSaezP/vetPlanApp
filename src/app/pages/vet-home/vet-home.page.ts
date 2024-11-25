import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CitasService } from '../../services/citas.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Mascota } from '../../models/mascota.model';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-vet-home',
  templateUrl: './vet-home.page.html',
  styleUrls: ['./vet-home.page.scss'],
})
export class VetHomePage implements OnInit {
  citas: any[] = [];
  mascotas: Mascota[] = [];
  segmentValue: string = 'calendario';
  userId: string | null = null;
  selectedDate: string = new Date().toISOString();
  citasDelDia: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private citasService: CitasService,
    public authService: AuthService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.userId = await this.authService.getUserId();
    if (this.userId) {
      this.loadData();
    }
  }

  async loadData() {
    this.loadCitas();
    this.loadMascotas();
  }

  loadCitas() {
    this.citasService.getCitas().subscribe(
      (citas) => {
        if (this.userId) {
          this.citas = citas.filter(cita => cita.usuarioId === this.userId);
          this.actualizarCitasDelDia();
        }
      },
      (error) => {
        console.error('Error al cargar citas:', error);
      }
    );
  }

  loadMascotas() {
    this.firestoreService.getAllMascotas().subscribe(
      (mascotas) => {
        this.mascotas = mascotas.filter(mascota =>
          this.citas.some(cita => cita.mascotaId === mascota.id)
        );
      },
      (error) => {
        console.error('Error al cargar mascotas:', error);
      }
    );
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  onDateChanged(event: any) {
    this.selectedDate = event.detail.value;
    this.actualizarCitasDelDia();
  }

  actualizarCitasDelDia() {
    const fechaSeleccionada = new Date(this.selectedDate).setHours(0,0,0,0);
    this.citasDelDia = this.citas.filter(cita => {
      const fechaCita = new Date(cita.fecha).setHours(0,0,0,0);
      return fechaCita === fechaSeleccionada;
    }).sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  getMascotaInfo(mascotaId: string): Mascota | undefined {
    return this.mascotas.find(mascota => mascota.id === mascotaId);
  }

  async verDetalleCita(cita: any) {
    const mascota = this.getMascotaInfo(cita.mascotaId);
    const alert = await this.alertController.create({
      header: 'Detalle de la Cita',
      message: `
        <strong>Fecha:</strong> ${new Date(cita.fecha).toLocaleString()}<br>
        <strong>Mascota:</strong> ${mascota?.nombre}<br>
        <strong>Especie:</strong> ${mascota?.especie}<br>
        <strong>Motivo:</strong> ${cita.motivo}<br>
        <strong>Estado:</strong> ${cita.estado}
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  async modificarCita(cita: any) {
    const alert = await this.alertController.create({
      header: 'Modificar Estado de Cita',
      inputs: [
        {
          name: 'estado',
          type: 'radio',
          label: 'Pendiente',
          value: 'pendiente',
          checked: cita.estado === 'pendiente'
        },
        {
          name: 'estado',
          type: 'radio',
          label: 'En proceso',
          value: 'en_proceso',
          checked: cita.estado === 'en_proceso'
        },
        {
          name: 'estado',
          type: 'radio',
          label: 'Completada',
          value: 'completada',
          checked: cita.estado === 'completada'
        },
        {
          name: 'estado',
          type: 'radio',
          label: 'Cancelada',
          value: 'cancelada',
          checked: cita.estado === 'cancelada'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.citasService.updateCita(cita.id, { estado: data });
            this.loadCitas();
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarCita(citaId: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: '¿Desea eliminar esta cita?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.citasService.deleteCita(citaId).then(() => {
              this.loadCitas();
            }).catch(error => {
              console.error('Error al eliminar cita:', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    await this.authService.logout();
  }
}