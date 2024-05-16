export const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const capitalizePorPalabra = (value: string) => {
    return capitalize(value).replace(/\b\w/g, l => l.toUpperCase())
}

export const capitalizePorPalabraAcentuada = (value: string) => {
    return capitalize(value).replace(/(^|\s)\S/g, l => l.toUpperCase())
}