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

const getFiltriPersonali = (token: any, pagina: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getFiltriPersonali"], ["pagina", pagina]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}


/*const getUtente = (token: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getUtente"], ["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const inserisciUtente = (token: any, jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "inserisciUtente"]]);
    const headers = {
        token: token,
    }

    return http.post(root, jsonBody, { params, headers });
}

const modificaUtente = (token: any, jsonBody: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "modificaUtente"], ["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const eliminaUtente = (token: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "eliminaUtente"], ["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.delete(root, { params, headers });
}

const bloccaUtente = (token: any, jsonBody: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "bloccaUtente"], ["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}

const sbloccaUtente = (token: any, jsonBody: any, idUtente: any) => {
    const params = new URLSearchParams([["nomeMetodo", "sbloccaUtente"], ["idUtente", idUtente]]);
    const headers = {
        token: token,
    }

    return http.put(root, jsonBody, { params, headers });
}*/


const terremotiService = {
    getTerremotiPerLista,
    /*getTerremotiPerMappa,
    getTerremoto,
    getRegioni,
    getProvince,
    getComuni,
    getCoordinateDatoIndirizzo,
    inserisciFiltroPersonale,*/
    getFiltriPersonali,/*
    getFiltroPersonale,
    deleteFiltroPersonale,
    getDistanzaComuniDatoTerremoto,
    getDistanzaLuoghiPersonaliDatoTerremoto,
    getCronJobs*/
};
export default terremotiService;