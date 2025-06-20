export const formatearFechaLocal = (fechaOriginal: string) => {
  const fechaFormateada = fechaOriginal.split("-").reverse().join("/");

  return fechaFormateada;
};

export const formatearFechaTipoDate = (fechaISO: Date) => {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
};

export const formatearFechaISO = (fechaISO: string): string => {
  const [año, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${año}`;
};

export const getFormattedDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

export const formatDateEs = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
};

export const formatearRangoFechas = (fechaDesde: Date, fechaHasta: Date) => ({
  fechaDesde: formatearFechaTipoDate(fechaDesde),
  fechaHasta: formatearFechaTipoDate(fechaHasta),
});

export const toDatetimeLocalString = (isoDate: string | Date) => {
  const date = typeof isoDate === "string" ? new Date(isoDate) : isoDate;
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );
  return offsetDate.toISOString().slice(0, 16);
};
