import http from "../http-common";

let root = "/recuperoPassword.php";



const getMetodiRecuperoPasswordSupportati = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "getMetodiRecuperoPasswordSupportati"]]);
    return http.post(root,jsonBody, { params });
}

const effettuaRichiestaRecuperoPassword = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "effettuaRichiestaRecuperoPassword"]]);
    return http.post(root,jsonBody, { params });
}

const confermaRecuperoPassword = (jsonBody: any) => {
    const params = new URLSearchParams([["nomeMetodo", "confermaRecuperoPassword"]]);
    return http.post(root,jsonBody, { params });
}


const recuperoPasswordService = {
    getMetodiRecuperoPasswordSupportati,
    effettuaRichiestaRecuperoPassword,
    confermaRecuperoPassword
};
export default recuperoPasswordService;