export interface MetaAhorro {
  id: number;
  nombreMeta: string;
  montoObjetivo: number;
  fechaLimite: Date;
  montoAhorrado: number;  
  progreso: number;
  estado: 'Alcanzada' | 'En progreso' | 'Fallida';
}
