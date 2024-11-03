
export interface Gasto {
  id: number;
  descripcion: string;
  categoria: string;
  monto: number;
  fecha: Date; // Asegúrate de que sea del tipo correcto
  metodoPago: string;
  frecuencia: string;
}
