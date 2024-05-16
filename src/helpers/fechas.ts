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
    const month = date.getMonth() + 1; // getMonth() devuelve un índice basado en cero, por lo que se suma 1
    const year = date.getFullYear();

    // Agrega un cero antes del día o mes si es menor a 10 para mantener el formato dd/mm/yyyy
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
};

export default function separadorMiles(n: number | string, fillZero: boolean) {

    if (!n) {
        if (fillZero) return '0';
        return '';
    }
    const mappedString = n.toString().replace('.', ',').split(',');
    const decimal = mappedString.length > 1 && mappedString[1];
    const sign = n.toString().includes('-') ? '-' : '';

    const montoSeparado = mappedString[0].toString()
        .replace(/[-+]?[^0-9]/g, '') 
        .replace('.', '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
    if (!decimal) {
        return sign + montoSeparado;
    } else {
        return sign + montoSeparado + ',' + decimal;
    }
}