export type BreadcrumbType = {
  nome: string
  path: string
};

let homePage: BreadcrumbType =
{
  nome: "Homepage",
  path: "/"
}

let impostazioni: BreadcrumbType =
{
  nome: "Impostazioni Utente",
  path: "/impostazioni"
}

let visualizzaLog: BreadcrumbType =
{
  nome: "Visualizza log",
  path: "/logs"
}

let visualizzaLogError: BreadcrumbType =
{
  nome: "Livello Error",
  path: "/logs/error"
}

let visualizzaLogWarn: BreadcrumbType =
{
  nome: "Livello Warn",
  path: "/logs/warn"
}

let visualizzaLogInfo: BreadcrumbType =
{
  nome: "Livello Info",
  path: "/logs/info"
}

let visualizzaLogDebug: BreadcrumbType =
{
  nome: "Livello Debug",
  path: "/logs/debug"
}

let listaVociDiMenu: BreadcrumbType =
{
  nome: "Lista voci di menu",
  path: "/lista-menu"
}

let listaNotificheUtente: BreadcrumbType =
{
  nome: "Lista notifiche",
  path: "/lista-notifiche-utente"
}

let schedaUtente: BreadcrumbType =
{
  nome: "Scheda utente",
  path: "/scheda-utente"
}

let listaUtenti: BreadcrumbType =
{
  nome: "Lista utenti",
  path: "/lista-utenti"
}

let listaRuoli: BreadcrumbType =
{
  nome: "Lista ruoli",
  path: "/lista-ruoli"
}

let schedaRuolo: BreadcrumbType =
{
  nome: "Scheda ruolo",
  path: "/scheda-ruolo"
}

let listaRisorse: BreadcrumbType =
{
  nome: "Lista risorse",
  path: "/lista-risorse"
}

let schedaRisorsa: BreadcrumbType =
{
  nome: "Scheda risorsa",
  path: "/scheda-risorsa"
}

let listaIndirizziIp: BreadcrumbType =
{
  nome: "Lista indirizzi IP",
  path: "/lista-indirizzi-ip"
}

let listaDispositiviFisici: BreadcrumbType =
{
  nome: "Lista dispositivi fisici",
  path: "/lista-dispositivi-fisici"
}

let schedaVoceMenu: BreadcrumbType =
{
  nome: "Scheda voce menu",
  path: "/scheda-voce-menu"
}

let schedaNotifica: BreadcrumbType =
{
  nome: "Scheda notifica",
  path: "/scheda-notifica"
}

let listaNotifiche: BreadcrumbType =
{
  nome: "Lista notifiche",
  path: "/lista-notifiche"
}

let listaAccessi: BreadcrumbType =
{
  nome: "Lista accessi",
  path: "/lista-accessi"
}

export default function BreadcrumbsMap(pathName: any) {
  let array: BreadcrumbType[] = [];
  array.push(homePage);

  if ("/impostazioni" === pathName) {
    array.push(impostazioni);
  }

  if ("/logs/error" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogError)
  }

  if ("/logs/warn" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogWarn)
  }

  if ("/logs/info" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogInfo)
  }

  if ("/logs/debug" === pathName) {
    array.push(visualizzaLog);
    array.push(visualizzaLogDebug)
  }

  if ("/logs" === pathName) {
    array.push(visualizzaLog);
  }

  if ("/lista-menu" === pathName) {
    array.push(listaVociDiMenu);
  }

  if ("/lista-notifiche-utente" === pathName) {
    array.push(listaNotificheUtente);
  }

  if (pathName.includes("scheda-utente")) {
    array.push(listaUtenti);
    array.push(schedaUtente);
  }

  if ("/lista-utenti" === pathName) {
    array.push(listaUtenti);
  }

  if ("/lista-ruoli" === pathName) {
    array.push(listaRuoli);
  }

  if (pathName.includes("scheda-ruolo")) {
    array.push(listaRuoli);
    array.push(schedaRuolo);
  }

  if ("/lista-risorse" === pathName) {
    array.push(listaRisorse);
  }

  if (pathName.includes("scheda-risorsa")) {
    array.push(listaRisorse);
    array.push(schedaRisorsa);
  }

  if ("/lista-indirizzi-ip" === pathName) {
    array.push(listaIndirizziIp);
  }

  if ("/lista-dispositivi-fisici" === pathName) {
    array.push(listaDispositiviFisici);
  }

  if (pathName.includes("scheda-voce-menu")) {
    array.push(listaVociDiMenu);
    array.push(schedaVoceMenu);
  }

  if (pathName.includes("scheda-notifica")) {
    array.push(listaNotifiche);
    array.push(schedaNotifica);
  }

  if ("/lista-notifiche" === pathName) {
    array.push(listaNotifiche);
  }

  if ("/lista-accessi" === pathName) {
    array.push(listaAccessi);
  }

  return array;
}