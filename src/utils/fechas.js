export const DURACION_CITA_MIN = 60;

// Obtener fecha local en formato YYYY-MM-DD
export function getLocalTodayDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Obtener fecha a partir de una fecha local + n días
export function addDaysLocal(dateString, days) {
  const d = new Date(dateString + 'T00:00:00');
  d.setDate(d.getDate() + days);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Obtener el lunes de la semana de una fecha
export function getStartOfWeekLocal(dateString) {
  const d = new Date(dateString + 'T00:00:00');
  const day = d.getDay(); // 0 is Sunday, 1 is Monday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const dDay = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${dDay}`;
}

// Formatear hora de HH:MM:SS a HH:MM
export function formatTime(timeString) {
  if (!timeString) return '';
  return timeString.substring(0, 5);
}

// Obtener lista de horas permitidas
export function getHorasPermitidas() {
  const horas = [];
  for (let h = 8; h <= 17; h++) {
    horas.push(`${h.toString().padStart(2, '0')}:00`);
  }
  return horas;
}

// Sumar minutos a una hora HH:MM
export function addMinutesToTime(timeStr, minutes) {
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  let m = parseInt(mStr, 10) + minutes;
  h += Math.floor(m / 60);
  m = m % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

// Saber si una fecha es anterior a hoy
export function isPastDateLocal(dateString) {
  return dateString < getLocalTodayDate();
}

// Obtener nombre del día de la semana en español
export function getDiaSemanaNombre(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString + 'T00:00:00');
  const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return dias[d.getDay()];
}

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// Formato de fecha corta: ej. "13 oct" o con incluirDia "martes 13 oct"
export function formatFechaCorta(dateString, incluirDia = false) {
  if (!dateString) return '';
  const d = new Date(dateString + 'T00:00:00');
  const diaNum = d.getDate();
  const mesNombre = MESES_CORTOS[d.getMonth()];
  if (incluirDia) {
    const diaSemana = getDiaSemanaNombre(dateString);
    return `${diaSemana} ${diaNum} ${mesNombre}`;
  }
  return `${diaNum} ${mesNombre}`;
}

// Sumar meses a una fecha local YYYY-MM-DD
export function addMonthsLocal(dateString, months) {
  const [y, m, d] = dateString.split('-').map(Number);
  const targetDate = new Date(y, m - 1 + months, 1);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();
  const maxDays = new Date(targetYear, targetMonth + 1, 0).getDate();
  const finalDay = Math.min(d, maxDays);
  const mm = String(targetMonth + 1).padStart(2, '0');
  const dd = String(finalDay).padStart(2, '0');
  return `${targetYear}-${mm}-${dd}`;
}

// Calcular lista de fechas para una serie (semanas o meses)
export function calcularFechasSerie(fechaInicio, cantidad, unidad) {
  if (!fechaInicio || !cantidad || cantidad < 1) return [];
  const fechas = [];
  
  if (unidad === 'semanas') {
    for (let i = 0; i < cantidad; i++) {
      fechas.push(addDaysLocal(fechaInicio, i * 7));
    }
  } else if (unidad === 'meses') {
    const fechaLimite = addMonthsLocal(fechaInicio, cantidad);
    let curr = fechaInicio;
    while (curr < fechaLimite) {
      fechas.push(curr);
      curr = addDaysLocal(curr, 7);
    }
  }
  
  return fechas;
}

// Generar texto resumen de la serie (ej. "Se crearán 12 citas: martes 13 oct, 20 oct, 27 oct… hasta el 29 dic")
export function formatearResumenSerie(fechas) {
  if (!fechas || fechas.length === 0) return '';
  if (fechas.length === 1) {
    return `Se creará 1 cita: ${formatFechaCorta(fechas[0], true)}`;
  }
  if (fechas.length === 2) {
    return `Se crearán 2 citas: ${formatFechaCorta(fechas[0], true)} y ${formatFechaCorta(fechas[1])}`;
  }
  if (fechas.length === 3) {
    return `Se crearán 3 citas: ${formatFechaCorta(fechas[0], true)}, ${formatFechaCorta(fechas[1])} y ${formatFechaCorta(fechas[2])}`;
  }
  const primera = formatFechaCorta(fechas[0], true);
  const segunda = formatFechaCorta(fechas[1]);
  const tercera = formatFechaCorta(fechas[2]);
  const ultima = formatFechaCorta(fechas[fechas.length - 1]);
  return `Se crearán ${fechas.length} citas: ${primera}, ${segunda}, ${tercera}… hasta el ${ultima}`;
}
