export interface Cita {
    id?: string; // El ID será generado por el sistema
    mascotaId: string; // ID de la mascota
    fecha: string; // Fecha y hora de la cita en formato ISO 8601
    motivo: string; // Motivo de la cita (Ej. consulta general, vacunación, etc.)
    estado: string; // Estado de la cita (Ej. pendiente, completada)
    usuarioId: string; // ID del usuario (veterinario) que gestionó la cita
}