export function cpfFormater(cpf: string) {
    if(cpf && cpf.length > 0){
        const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
        const cpfFormatted = cpf.replace(cpfRegex, '$1.$2.$3-$4');
        return cpfFormatted;
    }

}
