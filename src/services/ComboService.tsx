import { useSelector } from "react-redux";
import http from "../http-common";

let root = "/combo.php";

const getComboVociMenu = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboVociMenu"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getComboRuoli = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComboRuoli"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getTipologiaFiltriPersonali = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getTipologiaFiltriPersonali"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getRegioni = (token: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getRegioni"]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getProvince = (token: any, codiceRegione: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getProvince"], ["codiceRegione", codiceRegione]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const getComuni = (token: any, codiceProvincia: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getComuni"], ["codiceProvincia", codiceProvincia]]);
    const headers = {
        token: token,
    }

    return http.get(root, { params, headers });
}

const comboService = {
    getComboVociMenu,
    getComboRuoli,
    getTipologiaFiltriPersonali,
    getRegioni,
    getProvince,
    getComuni
};
export default comboService;