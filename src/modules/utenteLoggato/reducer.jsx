import React from "react";

export const initialState = {

}

export const utenteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_UTENTE':
            return {
                initialState
            }
        case 'FETCH_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'FETCH_NOME':
            return {
                ...state,
                nome: action.nome
            }
        case 'FETCH_COGNOME':
            return {
                ...state,
                cognome: action.cognome
            }
        case 'FETCH_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'FETCH_DATA_CREAZIONE':
            return {
                ...state,
                dataCreazione: action.dataCreazione
            }
        case 'FETCH_MENU':
            return {
                ...state,
                menu: action.menu
            }
        default:
            return state;
    }
}