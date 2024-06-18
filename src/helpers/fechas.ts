export const formatearFechaLocal = (fechaOriginal:string) => {

    const fechaFormateada = fechaOriginal.split('-').reverse().join('/');
    
        return fechaFormateada;
}
    

export const formatearFechaTipoDate = (fechaISO: Date) => {

    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;

}

export const getFormattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
};

