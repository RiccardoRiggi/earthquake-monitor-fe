import http from "../http-common";

let root = "/autenticazione.php";



const getMetodiAutenticazioneSupportati = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiAutenticazioneSupportati"]]);
    return http.post(root,jsonBody, { params });
}

const effettuaAutenticazione = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "effettuaAutenticazione"]]);
    return http.post(root,jsonBody, { params });
}

const confermaAutenticazione = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "confermaAutenticazione"]]);
    return http.post(root,jsonBody, { params });
}

const generaQrCode = () => {
    const params = new URLSearchParams([["nomeMetodo", "generaQrCode"]]);
    return http.get(root, { params });
}

const recuperaTokenDaQrCode = (idQrCode: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaTokenDaQrCode"],["idQrCode",idQrCode]]);
    return http.get(root, { params });
}

const recuperaTokenDaLogin = (idLogin: any) => {
    const params = new URLSearchParams([["nomeMetodo", "recuperaTokenDaLogin"],["idLogin",idLogin]]);
    return http.get(root, { params });
}


const autenticazioneService = {
    getMetodiAutenticazioneSupportati,
    generaQrCode,
    recuperaTokenDaQrCode,
    effettuaAutenticazione,
    recuperaTokenDaLogin,
    confermaAutenticazione

};
export default autenticazioneService;