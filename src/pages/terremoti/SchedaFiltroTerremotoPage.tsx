import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';
import utentiService from '../../services/UtentiService';
import SchedaUtenteValidator from '../../validators/SchedaUtenteValidator';
import SchedaFiltroValidator from '../../validators/SchedaFiltroValidator';
import terremotiService from '../../services/TerremotiService';
import comboService from '../../services/ComboService';

import { MapContainer } from '../../../node_modules/react-leaflet/lib/MapContainer'
import { TileLayer } from '../../../node_modules/react-leaflet/lib/TileLayer'
import { Popup } from '../../../node_modules/react-leaflet/lib/Popup'
import { Marker } from '../../../node_modules/react-leaflet/lib/Marker'
import { getIcon } from '../../components/Markers';


export default function SchedaFiltroTerremotoPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [formErrors, setFormErrors] = React.useState<any>(Object);
    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [listaTipologieFiltriPersonali, setListaTipologieFiltriPersonali] = React.useState([]);



    const [nomeFiltro, setNomeFiltro] = React.useState<any>("");
    const [idTipoFiltroPersonale, setIdTipoFiltroPersonale] = React.useState("");
    const [codiceRegione, setCodiceRegione] = React.useState<any>("");
    const [descrizioneRegione, setDescrizioneRegione] = React.useState<any>("");
    const [codiceProvincia, setCodiceProvincia] = React.useState<any>("");
    const [descrizioneProvincia, setDescrizioneProvincia] = React.useState<any>("");
    const [codiceComune, setCodiceComune] = React.useState<any>("");
    const [descrizioneComune, setDescrizioneComune] = React.useState<any>("");
    const [cap, setCap] = React.useState<any>("");
    const [latitudine, setLatitudine] = React.useState<any>("");
    const [longitudine, setLongitudine] = React.useState<any>("");
    const [distanza, setDistanza] = React.useState<any>("");
    const [indirizzo, setIndirizzo] = React.useState<any>("");




    let navigate = useNavigate();

    const getTipologiaFiltriPersonali = async () => {
        dispatch(fetchIsLoadingAction(true));
        await comboService.getTipologiaFiltriPersonali(utenteLoggato.token).then(response => {
            setListaTipologieFiltriPersonali(response.data);
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            dispatch(fetchIsLoadingAction(false));
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------
        });
    }


    const getUtente = async () => {
        dispatch(fetchIsLoadingAction(true));
        await utentiService.getUtente(utenteLoggato.token, params.idUtente).then(response => {
            /* setNome(response.data.nome);
             setCognome(response.data.cognome);
             setEmail(response.data.email)*/
            dispatch(fetchIsLoadingAction(false));
        }).catch(e => {
            dispatch(fetchIsLoadingAction(false));
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
            if (e.response.status === 401) {
                navigate("/logout");
            }
            //---------------------------------------------

        });
    }



    const submitForm = async () => {
        let formsErrorTmp = undefined;
        let jsonBody = undefined;

        if (params.idUtente === undefined) {
            /*jsonBody = {
                nome: nome,
                cognome: cognome,
                email: email,
                password: password,
                confermaPassword: confermaPassword
            }*/


            formsErrorTmp = SchedaFiltroValidator(jsonBody);
            setFormErrors(formsErrorTmp);

        }



        if (Object.keys(formsErrorTmp).length == 0) {

            if (params.idUtente === undefined) {
                dispatch(fetchIsLoadingAction(true));
                await utentiService.inserisciUtente(utenteLoggato.token, jsonBody).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Utente inserito con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    navigate("/lista-utenti");
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchIsLoadingAction(false));
                    //---------------------------------------------
                    try {
                        console.error(e);
                        toast.error(e.response.data.descrizione, {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    } catch (e: any) {
                        toast.error("Errore imprevisto", {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    }
                    if (e.response.status === 401) {
                        navigate("/logout");
                    }
                    //---------------------------------------------
                });
            } else {
                dispatch(fetchIsLoadingAction(true));
                await utentiService.modificaUtente(utenteLoggato.token, jsonBody, params.idUtente).then(response => {
                    dispatch(fetchIsLoadingAction(false));
                    toast.success("Utente aggiornato con successo!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }).catch(e => {
                    console.error(e);
                    dispatch(fetchIsLoadingAction(false));
                    //---------------------------------------------
                    try {
                        console.error(e);
                        toast.error(e.response.data.descrizione, {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    } catch (e: any) {
                        toast.error("Errore imprevisto", {
                            position: "top-center",
                            autoClose: 5000,
                        });
                    }
                    if (e.response.status === 401) {
                        navigate("/logout");
                    }
                    //---------------------------------------------
                });
            }

        }
    }

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idUtente !== undefined) {
                getUtente();
            }
            getTipologiaFiltriPersonali();
            setRicercaEseguita(true);
        }
    });

    const position = [51.505, -0.09]


    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            {params.idUtente === undefined ? <i className="fa-solid fa-user-plus text-primary fa-1x pe-2 "></i> : <i className="fa-solid fa-user-pen text-primary fa-1x pe-2 "></i>}
                            {params.idUtente === undefined ? "Nuovo" : "Visualizza"} filtro
                        </h3>
                        {params.idFiltroPersonale === undefined &&
                            <button onClick={submitForm} className="btn btn-primary">
                                <span className='pe-1'>{params.idUtente === undefined ? "Salva" : "Salva modifiche"}</span>
                                <i className="fas fa-save fa-sm fa-fw "></i>
                            </button>
                        }
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className={"col-12"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Tipologia di filtro</label>

                            </div>
                            <select name='idVoceMenuPadre' className={formErrors?.idTipoFiltroPersonale != undefined ? "form-control is-invalid" : "form-control"} onChange={(event: any) => setIdTipoFiltroPersonale(event.target.value)} value={idTipoFiltroPersonale}>
                                <option value={""}>Scegli...</option>
                                {Array.isArray(listaTipologieFiltriPersonali) && listaTipologieFiltriPersonali.map((val: any) =>
                                    <option value={val.idTipoFiltroPersonale} >{val.descrizione}</option>
                                )}
                            </select>
                            <small className='text-danger'>{formErrors?.idTipoFiltroPersonale}</small>
                        </div>


                        <div className={"col-12 pt-3"}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                <label>Nome filtro<strong className='text-danger'>*</strong></label>

                            </div>
                            <input name='nome' type={"text"} onChange={(e: any) => setNomeFiltro(e.currentTarget.value)} className={formErrors?.nomeFiltro != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome"} value={nomeFiltro} />

                            <small className='text-danger'>{formErrors?.nomeFiltro}</small>
                        </div>

                        <div className={"col-12 pt-3"}>

                            <MapContainer center={[41.60897592585041, 12.593894063067715]} zoom={13} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[41.60897592585041, 12.593894063067715]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    );

}