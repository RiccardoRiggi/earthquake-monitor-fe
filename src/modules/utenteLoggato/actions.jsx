import React from "react";

export const resetUtenteAction  = (utente) => ({
    type: 'RESET_UTENTE',
    utente
})

export const fetchTokenAction  = (token) => ({
    type: 'FETCH_TOKEN',
    token
})

export const fetchNomeAction  = (nome) => ({
    type: 'FETCH_NOME',
    nome
})

export const fetchCognomeAction  = (cognome) => ({
    type: 'FETCH_COGNOME',
    cognome
})

export const fetchEmailAction  = (email) => ({
    type: 'FETCH_EMAIL',
    email
})

export const fetchDataCreazioneAction  = (dataCreazione) => ({
    type: 'FETCH_DATA_CREAZIONE',
    dataCreazione
})

export const fetchMenuAction  = (menu) => ({
    type: 'FETCH_MENU',
    menu
})
