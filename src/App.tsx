import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import ListaAccessiPage from './pages/accessiAttivi/ListaAccessiPage';
import ListaDispositiviFisiciPage from './pages/dispositiviFisici/ListaDispositiviFisiciPage';

import HomePage from './pages/HomePage';
import ImpostazioniPage from './pages/ImpostazioniPage';
import ListaIndirizziIp from './pages/indirizziIp/ListaIndirizziIp';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import LogsPage from './pages/LogsPage';
import ListaVociMenuPage from './pages/menu/ListaVociMenuPage';
import SchedaVoceMenuPage from './pages/menu/SchedaVoceMenuPage';
import ListaNotifichePage from './pages/notifiche/ListaNotifichePage';
import ListaNotificheUtentePage from './pages/notifiche/ListaNotificheUtentePage';
import SchedaNotificaPage from './pages/notifiche/SchedaNotificaPage';
import RecuperoPasswordPage from './pages/RecuperoPasswordPage';
import ListaRisorsePage from './pages/risorse/ListaRisorsePage';
import SchedaRisorsaPage from './pages/risorse/SchedaRisorsaPage';
import ListaRuoliPage from './pages/ruoli/ListaRuoliPage';
import SchedaRuoloPage from './pages/ruoli/SchedaRuoloPage';
import ListaUtentiPage from './pages/utenti/ListaUtentiPage';
import SchedaUtentePage from './pages/utenti/SchedaUtentePage';
import ListaAccountTelegramPage from './pages/accountTelegram/ListaAccountTelegramPage';
import ListaTerremotiPage from './pages/terremoti/ListaTerremotiPage';
import ListaFiltriPersonaliPage from './pages/terremoti/ListaFiltriPersonaliPage';
import SchedaFiltroTerremotoPage from './pages/terremoti/SchedaFiltroTerremotoPage';




function App() {
  return (
    <>
      <BrowserRouter basename=''>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="recupero-password" element={<RecuperoPasswordPage />} />

          <Route path="logout" element={<LogoutPage />} />




          <Route
            path=""
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/impostazioni"
            element={
              <PrivateRoute>
                <ImpostazioniPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/logs/:livelloLog"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/logs"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-menu"
            element={
              <PrivateRoute>
                <ListaVociMenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-voce-menu"
            element={
              <PrivateRoute>
                <SchedaVoceMenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-voce-menu/:idVoceMenu"
            element={
              <PrivateRoute>
                <SchedaVoceMenuPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-risorse"
            element={
              <PrivateRoute>
                <ListaRisorsePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-risorsa"
            element={
              <PrivateRoute>
                <SchedaRisorsaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-risorsa/:idRisorsa"
            element={
              <PrivateRoute>
                <SchedaRisorsaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-ruoli"
            element={
              <PrivateRoute>
                <ListaRuoliPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-ruolo"
            element={
              <PrivateRoute>
                <SchedaRuoloPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-ruolo/:idTipoRuolo"
            element={
              <PrivateRoute>
                <SchedaRuoloPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-utenti"
            element={
              <PrivateRoute>
                <ListaUtentiPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-utente"
            element={
              <PrivateRoute>
                <SchedaUtentePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-utente/:idUtente"
            element={
              <PrivateRoute>
                <SchedaUtentePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-indirizzi-ip"
            element={
              <PrivateRoute>
                <ListaIndirizziIp />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-dispositivi-fisici"
            element={
              <PrivateRoute>
                <ListaDispositiviFisiciPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-account-telegram"
            element={
              <PrivateRoute>
                <ListaAccountTelegramPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-accessi"
            element={
              <PrivateRoute>
                <ListaAccessiPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-notifiche-utente"
            element={
              <PrivateRoute>
                <ListaNotificheUtentePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-notifiche"
            element={
              <PrivateRoute>
                <ListaNotifichePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-notifica"
            element={
              <PrivateRoute>
                <SchedaNotificaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/scheda-notifica/:idNotifica"
            element={
              <PrivateRoute>
                <SchedaNotificaPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/terremoti"
            element={
              <PrivateRoute>
                <ListaTerremotiPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lista-filtri-personali"
            element={
              <PrivateRoute>
                <ListaFiltriPersonaliPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/filtri-personali"
            element={
              <PrivateRoute>
                <SchedaFiltroTerremotoPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/filtri-personali/:idFiltroPersonale"
            element={
              <PrivateRoute>
                <SchedaFiltroTerremotoPage />
              </PrivateRoute>
            }
          />


          <Route
            path="*"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;
