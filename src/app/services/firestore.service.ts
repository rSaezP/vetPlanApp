import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las mascotas (si es un admin)
  getAllMascotas(): Observable<any[]> {
    return this.firestore.collection('mascotas').valueChanges();  // valueChanges() retorna un Observable
  }

  // Obtener mascotas de un usuario
  getMascotasByUserId(userId: string): Observable<any[]> {
    return this.firestore
      .collection('mascotas', ref => ref.where('userId', '==', userId))
      .valueChanges();  // valueChanges() retorna un Observable
  }
  // Agregar una nueva mascota
  addMascota(mascota: any) {
    return this.firestore.collection('mascotas').add(mascota);
  }

  // Editar una mascota
  updateMascota(id: string, mascota: any) {
    return this.firestore.collection('mascotas').doc(id).update(mascota);
  }

  // Eliminar una mascota
  deleteMascota(id: string) {
    return this.firestore.collection('mascotas').doc(id).delete();
  }
}
