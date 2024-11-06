
export interface Gasto {
  id: number;
  descripcion: string;
  categoria: string;
  monto: number;
  fecha: Date; 
  metodoPago: string;
  frecuencia: string;
}
