import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'durationRange' })
export class DurationRangePipe implements PipeTransform {
  transform(value: { start: string | Date, end?: string | Date }, fechaActual?: string | Date): string {
    if (!value || !value.start) return '';
    
    const start = new Date(value.start);
    const end = value.end ? new Date(value.end) : (fechaActual ? new Date(fechaActual) : new Date());
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    let durationText = '';
    if (months === 0) {
      durationText = '0 meses';
    } else if (months === 1) {
      durationText = '1 mes';
    } else if (months < 12) {
      durationText = `${months} meses`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (years === 1) {
        durationText = remainingMonths === 0 ? '1 año' : `1 año ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      } else {
        durationText = remainingMonths === 0 ? `${years} años` : `${years} años ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
      }
    }
    
    const startLabel = start.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    });
    const endLabel = value.end 
      ? end.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
      : 'Presente';
    
    return `${startLabel} — ${endLabel} (${durationText})`;
  }
}
