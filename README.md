# Earthquake Monitor
Earthquake Monitor è una Web Application basata sul progetto [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe) che consente di visualizzare, filtrare e ricevere notifiche in tempo reale sugli eventi sismici avvenuti in Italia. Nel repository del [backend](https://github.com/RiccardoRiggi/earthquake-monitor-be) puoi trovare la documentazione per invocare i servizi e la struttura del database. Nel repository [Earthquake Monitor Authenticator](https://github.com/RiccardoRiggi/earthquake-monitor-authenticator) puoi trovare la seconda applicazione React necessaria per eseguire l'autenticazione a due fattori. In alternativa puoi configurare un account Telegram per ricevere il codice di verifica.  

![Home](https://raw.githubusercontent.com/RiccardoRiggi/otter-guardian-fe/main/screenshots/homepage.png)

Di seguito è presente la documentazione delle funzionalità specifiche. La documentazione completa del modulo FE è disponibile [qui](https://github.com/RiccardoRiggi/otter-guardian-fe)    

## Lista terremoti

![Lista terremoti](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/listaTerremoti.png)

Dalla lista ruoli è possibile visualizzare tutti gli eventi sismici avvenuti in Italia.

## Scheda terremoto

![Scheda terremoto](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/schedaTerremotoUno.png)
![Scheda terremoto](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/schedaTerremotoDue.png)

Dalla scheda terremoto è possibile vedere tutti i dettagli, l'epicentro sulla mappa, la distanza da tutti i comuni italiani e dai luoghi personalizzati. 

## Mappa terremoti

![Mappa terremoti](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/listaTerremoti.png)

Con questa funzionalità è possibile vedere sulla mappa l'epicentro di ogni terremoto. Si può scegliere un range temporale e un valore minimo di magnitudo. 

## Filtra terremoti

![Filtra terremoti](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/filtraTerremoti.png)

Con questa funzionalità è possibile scegliere sulla mappa un punto e cercare in un determinato raggio tutti gli eventi sismici avvenuti in quella zona. 

## Lista filtri

![Lista filtri](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/listaFiltri.png)

Con questa funzionalità è possibile visualizzare tutti i filtri personali con le relative soglie per le notifiche. Ad esempio è possibile impostare un valore di magnitudo minimo oppure un raggio da un determinato luogo. 

## Scheda filtro

![Scheda filtro](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/schedaFiltro.png)

Tramite questa pagina è possibile creare un nuovo filtro per ricevere le notifiche su Telegram (sarà necessario abilitare l'account telegram dalla pagina impostazioni). Inserite le informazioni necessarie potrai confermare il tuo indirizzo sulla mappa e salvare il filtro.   

## Lista aggiornamenti

![Lista aggiornamenti](https://raw.githubusercontent.com/RiccardoRiggi/earthquake-monitor-fe/main/screenshots/listaAggiornamenti.png)

Da questa pagina è possibile consultare lo storico degli allineamenti della banca dati. 

## Bom / Diba

* [React](https://react.dev/)
* [React Redux](https://react-redux.js.org/)
* [React Qr Code](https://github.com/rosskhanas/react-qr-code)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/otter-guardian-fe/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. I dati dei terremoti sono di proprietà dell'[Istituto Nazionale di Geofisica e Vulcanologia](https://www.ingv.it/) e vengono distribuiti con licenza [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/). I dati relativi a Regioni, Province e Comuni vengono distribuiti dall'[Istituto nazionale di statistica](https://www.istat.it/it/) con licenza ( Creative Commons – Attribuzione – versione 3.0)[https://creativecommons.org/licenses/by/3.0/it/]. I dati relativi alle coordinate geografiche vengono recuperati ed elaborati tramite le API di [Here](https://www.here.com/get-started/pricing).