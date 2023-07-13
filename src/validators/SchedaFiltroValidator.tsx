
export default function SchedaFiltroValidator(filtro: any) {
    let errors: any = {};

    if (filtro === undefined || filtro.idTipoFiltroPersonale === null) {
        errors.idTipoFiltroPersonale = "Il tipo filtro è richiesto";
        return;
    }

    if (filtro === undefined || filtro.idTipoFiltroPersonale === null || filtro.idTipoFiltroPersonale === "") {
        errors.nome = "Il tipo filtro è richiesto";
    }

    if (filtro.idTipoFiltroPersonale === "MAGNITUDO" || filtro.idTipoFiltroPersonale === "MAGNITUDO_DISTANZA") {
        if (filtro.magnitudo === null || filtro.magnitudo === "") {
            errors.magnitudo = "La magnitudo è richiesta";
        }
    }

    if (filtro.idTipoFiltroPersonale === "DISTANZA" || filtro.idTipoFiltroPersonale === "MAGNITUDO_DISTANZA") {
        if (filtro.codiceRegione === null || filtro.codiceRegione === "") {
            errors.codiceRegione = "La regione è richiesta";
        }

        if (filtro.codiceProvincia === null || filtro.codiceProvincia === "") {
            errors.codiceProvincia = "La provincia è richiesta";
        }

        if (filtro.codiceComune === null || filtro.codiceComune === "") {
            errors.codiceComune = "Il comune è richiesto";
        }

        if (filtro.cap === null || filtro.cap === "") {
            errors.cap = "Il cap è richiesto";
        }

        if (filtro.latitudine === null || filtro.latitudine === "") {
            errors.latitudine = "La latitudine è richiesta";
        }

        if (filtro.longitudine === null || filtro.longitudine === "") {
            errors.longitudine = "La longitudine è richiesta";
        }

        if (filtro.distanza === null || filtro.distanza === "") {
            errors.distanza = "La distanza è richiesta";
        }

        if (filtro.indirizzo === null || filtro.indirizzo === "") {
            errors.indirizzo = "L'indirizzo è richiesto";
        }
    }




    return errors;
} 