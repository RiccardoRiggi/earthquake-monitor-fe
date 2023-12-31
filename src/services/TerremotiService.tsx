import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/terremoti.php";

const getTerremotiPerLista = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTerremoti"], ["pagina", pagina], ["magnitudo", 0]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getTerremotiPerMappaGenerale = (token: any, magnitudo: any, dataInizioIntervallo: any, dataFineIntervallo: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTerremoti"], ["dataInizioIntervallo", dataInizioIntervallo], ["dataFineIntervallo", dataFineIntervallo], ["magnitudo", magnitudo]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getTerremotiPerMappaFiltro = (token: any, magnitudo: any, latitudine: any, longitudine: any, distanza: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTerremoti"], ["latitudine", latitudine], ["longitudine", longitudine], ["magnitudo", magnitudo], ["distanza", distanza]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getFiltriPersonali = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getFiltriPersonali"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getFiltroPersonale = (token: any, idFiltroPersonale: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getFiltroPersonale"], ["idFiltroPersonale", idFiltroPersonale]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getCoordinateDatoIndirizzo = (token: any, regione: any, provincia: any, comune: any, indirizzo: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getCoordinateDatoIndirizzo"], ["regione", regione], ["provincia", provincia], ["comune", comune], ["indirizzo", indirizzo]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciFiltroPersonale = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciFiltroPersonale"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const deleteFiltroPersonale = (token: any, idFiltroPersonale: any) => {
    const params = new URLSearchParams([["nomeMetodo", "deleteFiltroPersonale"], ["idFiltroPersonale", idFiltroPersonale]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const getTerremoto = (token: any, id: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTerremoto"], ["id", id]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getDistanzaComuniDatoTerremoto = (token: any, id: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getDistanzaComuniDatoTerremoto"], ["id", id], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getDistanzaLuoghiPersonaliDatoTerremoto = (token: any, id: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getDistanzaLuoghiPersonaliDatoTerremoto"], ["id", id], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getCronJobs = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getCronJobs"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


const terremotiService = {
    getTerremotiPerLista,
    getTerremotiPerMappaGenerale,
    getTerremotiPerMappaFiltro,
    getTerremoto,
    getCoordinateDatoIndirizzo,
    inserisciFiltroPersonale,
    getFiltriPersonali,
    getFiltroPersonale,
    deleteFiltroPersonale,
    getDistanzaComuniDatoTerremoto,
    getDistanzaLuoghiPersonaliDatoTerremoto,
    getCronJobs
};
export default terremotiService;