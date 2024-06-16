export const separadorMiles = (n: number | string, fillZero: boolean) => {

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