export default function PageTitleMap(pathName: any) {
  console.info(pathName);

  if ("/" === pathName) {
    return "Lista terremoti"
  } else if ("/dashboard" === pathName) {
    return "Dashboard"
  } else if ("/impostazioni" === pathName) {
    return "Impostazioni utente"
  } else if ("/logs/error" === pathName) {
    return "Log livello error"
  } else if ("/logs/warn" === pathName) {
    return "Log livello warn"
  } else if ("/logs/info" === pathName) {
    return "Log livello info"
  } else if ("/logs/debug" === pathName) {
    return "Log livello debug"
  } else if ("/logs" === pathName) {
    return "Log"
  } else if ("/lista-menu" === pathName) {
    return "Lista voci di menu"
  } else if ("/lista-notifiche-utente" === pathName) {
    return "Lista notifiche"
  } else if ("/scheda-utente" === pathName || pathName.includes("scheda-utente")) {
    return "Scheda utente"
  } else if ("/lista-utenti" === pathName) {
    return "Lista utenti"
  } else if ("/lista-ruoli" === pathName) {
    return "Lista ruoli"
  } else if ("/scheda-ruolo" === pathName || pathName.includes("scheda-ruolo")) {
    return "Scheda ruolo"
  } else if ("/lista-risorse" === pathName) {
    return "Lista risorse"
  } else if (pathName.includes("scheda-risorsa")) {
    return "Scheda risorsa"
  } else if ("/lista-indirizzi-ip" === pathName) {
    return "Lista indirizzi IP"
  } else if ("/lista-dispositivi-fisici" === pathName) {
    return "Lista dispositivi fisici"
  } else if (pathName.includes("scheda-voce-menu")) {
    return "Scheda voce menu"
  } else if (pathName.includes("scheda-notifica")) {
    return "Scheda notifica"
  } else if ("/lista-notifiche" === pathName) {
    return "Lista notifiche"
  } else if ("/lista-accessi" === pathName) {
    return "Lista accessi"
  } else if ("/terremoti" === pathName) {
    return "Lista terremoti"
  } else if (pathName.includes("/terremoti/")) {
    return "Scheda terremoto"
  } else if ("/mappa-terremoti" === pathName) {
    return "Visualizza mappa"
  } else if ("/filtro-mappa-terremoti" === pathName) {
    return "Cerca terremoti dato un punto geografico"
  } else if ("/lista-filtri-personali" === pathName) {
    return "Gestione filtri personali"
  } else if (pathName.includes("/filtri-personali")) {
    return "Scheda filtro"
  } else if (pathName.includes("/lista-aggiornamenti")) {
    return "Lista aggiornamenti"
  } else {
    return "";
  }
}