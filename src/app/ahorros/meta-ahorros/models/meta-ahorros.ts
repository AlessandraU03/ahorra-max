export interface MetaAhorro {
  id: number;
  nombre_meta: string;
  monto_objetivo: number;
  fecha_limite: Date;
  monto_ahorrado: number;
  progreso?: number;
  estado?: 'Alcanzada' | 'En progreso' | 'Fallida';
}
