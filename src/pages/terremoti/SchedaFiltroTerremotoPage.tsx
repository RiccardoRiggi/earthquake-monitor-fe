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
    const [listaRegioni, setListaRegioni] = React.useState([]);
    const [listaProvince, setListaProvince] = React.useState([]);
    const [listaComuni, setListaComuni] = React.useState([]);



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
    const [magnitudo, setMagnitudo] = React.useState<any>("");




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

    const getRegioni = async () => {
        await comboService.getRegioni(utenteLoggato.token).then(response => {
            setListaRegioni(response.data);
        }).catch(e => {
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

    const getProvince = async (codiceRegione: any) => {
        if (params.idFiltroPersonale === undefined) {
            setCodiceProvincia("");
            setCodiceComune("");
        }
        await comboService.getProvince(utenteLoggato.token, codiceRegione).then(response => {
            setListaProvince(response.data);
        }).catch(e => {
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

    const getComuni = async (codiceProvincia: any) => {
        if (params.idFiltroPersonale === undefined) {
            setCodiceComune("");
        }
        await comboService.getComuni(utenteLoggato.token, codiceProvincia).then(response => {
            setListaComuni(response.data);
        }).catch(e => {
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

    const estraiOggettoDallaLista: any = (listaRegioni: any, codiceRegione: any, nomeAttributo: string) => {
        let tmp = {}
        if (Array.isArray(listaRegioni)) {
            listaRegioni.forEach(function (regione) {
                if (regione[nomeAttributo] == codiceRegione) {
                    tmp = regione;
                }
            });
        }
        return tmp;
    }

    const getCoordinateDatoIndirizzo = async () => {

        const regione = estraiOggettoDallaLista(listaRegioni, codiceRegione, "codiceRegione").descrizioneRegione;
        const provincia = estraiOggettoDallaLista(listaProvince, codiceProvincia, "codiceProvincia").descrizioneProvincia;
        const comune = estraiOggettoDallaLista(listaComuni, codiceComune, "codiceComune").descrizioneComune;


        await terremotiService.getCoordinateDatoIndirizzo(utenteLoggato.token, regione, provincia, comune, indirizzo).then(response => {

            console.info(response.data.items);

            if (Array.isArray(response.data.items)) {
                setLatitudine(response.data.items[0].position.lat);
                setLongitudine(response.data.items[0].position.lng);
                setIndirizzo(response.data.items[0].title);
                setCap(response.data.items[0].address.postalCode);
            } else {
                toast.warning("Non è stato trovato un indirizzo valido sul cartografico", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        }).catch(e => {
            //---------------------------------------------
            try {
                console.error(e);
                toast.error(e.response.data.descrizione, {
                    position: "top-center",
                    autoClose: 5000,
                });
            } catch (e: any) {
                toast.error("Errore imprevisto durante la ricerca sul cartografico", {
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
        await terremotiService.getFiltroPersonale(utenteLoggato.token, params.idFiltroPersonale).then(response => {
            console.info(response.data);
            setNomeFiltro(response.data.nomeFiltro);
            setIdTipoFiltroPersonale(response.data.idTipoFiltroPersonale);
            setCodiceRegione(response.data.codiceRegione);
            getProvince(response.data.codiceRegione);
            setCodiceProvincia(response.data.codiceProvincia);
            getComuni(response.data.codiceProvincia);
            setCodiceComune(response.data.codiceComune);
            setCap(response.data.cap);
            setLatitudine(response.data.latitudine);
            setLongitudine(response.data.longitudine);
            setDistanza(response.data.distanza);
            setIndirizzo(response.data.indirizzo);
            setMagnitudo(response.data.magnitudo);
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

        const descrizioneRegione = estraiOggettoDallaLista(listaRegioni, codiceRegione, "codiceRegione").descrizioneRegione;
        const descrizioneProvincia = estraiOggettoDallaLista(listaProvince, codiceProvincia, "codiceProvincia").descrizioneProvincia;
        const descrizioneComune = estraiOggettoDallaLista(listaComuni, codiceComune, "codiceComune").descrizioneComune;

        let jsonBody = {
            idTipoFiltroPersonale: idTipoFiltroPersonale,
            nomeFiltro: nomeFiltro,
            codiceRegione: codiceRegione,
            descrizioneRegione: descrizioneRegione,
            codiceProvincia: codiceProvincia,
            descrizioneProvincia: descrizioneProvincia,
            codiceComune: codiceComune,
            descrizioneComune: descrizioneComune,
            cap: cap,
            latitudine: latitudine,
            longitudine: longitudine,
            distanza: distanza,
            indirizzo: indirizzo,
            magnitudo: magnitudo
        }


        formsErrorTmp = SchedaFiltroValidator(jsonBody);
        setFormErrors(formsErrorTmp);





        if (Object.keys(formsErrorTmp).length == 0) {

            dispatch(fetchIsLoadingAction(true));
            await terremotiService.inserisciFiltroPersonale(utenteLoggato.token, jsonBody).then(response => {
                dispatch(fetchIsLoadingAction(false));
                toast.success("Filtro inserito con successo!", {
                    position: "top-center",
                    autoClose: 5000,
                });
                navigate("/lista-filtri-personali");
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

    useEffect(() => {

        if (!ricercaEseguita) {
            if (params.idFiltroPersonale !== undefined) {
                getUtente();
            }
            getTipologiaFiltriPersonali();
            getRegioni();
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
                            {params.idFiltroPersonale === undefined ? <i className="fa-solid fa-plus text-primary fa-1x pe-2 "></i> : <i className="fa-solid fa-edit text-primary fa-1x pe-2 "></i>}
                            {params.idFiltroPersonale === undefined ? "Nuovo" : "Visualizza"} filtro
                        </h3>
                        {params.idFiltroPersonale === undefined &&
                            <button onClick={submitForm} className="btn btn-primary">
                                <span className='pe-1'>Salva</span>
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
                            <select disabled={params.idFiltroPersonale!==undefined} name='idVoceMenuPadre' className={formErrors?.idTipoFiltroPersonale != undefined ? "form-control is-invalid" : "form-control"} onChange={(event: any) => setIdTipoFiltroPersonale(event.target.value)} value={idTipoFiltroPersonale}>
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
                            <input disabled={params.idFiltroPersonale!==undefined} name='nome' type={"text"} onChange={(e: any) => setNomeFiltro(e.currentTarget.value)} className={formErrors?.nomeFiltro != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome"} value={nomeFiltro} />

                            <small className='text-danger'>{formErrors?.nomeFiltro}</small>
                        </div>

                        {(idTipoFiltroPersonale === "MAGNITUDO" || idTipoFiltroPersonale === "MAGNITUDO_DISTANZA") && <>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Magnitudo<strong className='text-danger'>*</strong></label>

                                </div>
                                <input disabled={params.idFiltroPersonale!==undefined} placeholder='Inserisci un numero' type={"number"} min={0} max={10} step={0.1} onChange={(e: any) => setMagnitudo(e.currentTarget.value)} className={formErrors?.magnitudo != undefined ? "form-control is-invalid" : "form-control"} value={magnitudo} />

                                <small className='text-danger'>{formErrors?.magnitudo}</small>
                            </div>

                        </>}


                        {(idTipoFiltroPersonale === "DISTANZA" || idTipoFiltroPersonale === "MAGNITUDO_DISTANZA") && <>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Distanza<strong className='text-danger'>*</strong></label>

                                </div>
                                <input disabled={params.idFiltroPersonale!==undefined} type={"number"} min={0} max={1500} onChange={(e: any) => setDistanza(e.currentTarget.value)} className={formErrors?.distanza != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci una distanza in Km"} value={distanza} />

                                <small className='text-danger'>{formErrors?.distanza}</small>
                            </div>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Regione<strong className='text-danger'>*</strong></label>

                                </div>
                                <select disabled={params.idFiltroPersonale!==undefined} name='idVoceMenuPadre' className={formErrors?.codiceRegione != undefined ? "form-control is-invalid" : "form-control"} onChange={(event: any) => { setCodiceRegione(event.target.value); getProvince(event.target.value); }} value={codiceRegione}>
                                    <option value={""}>Scegli...</option>
                                    {Array.isArray(listaRegioni) && listaRegioni.map((val: any) =>
                                        <option value={val.codiceRegione} >{val.descrizioneRegione}</option>
                                    )}
                                </select>
                                <small className='text-danger'>{formErrors?.codiceRegione}</small>
                            </div>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Provincia<strong className='text-danger'>*</strong></label>

                                </div>
                                <select disabled={params.idFiltroPersonale!==undefined} name='idVoceMenuPadre' className={formErrors?.codiceProvincia != undefined ? "form-control is-invalid" : "form-control"} onChange={(event: any) => { setCodiceProvincia(event.target.value); getComuni(event.target.value); }} value={codiceProvincia}>
                                    <option value={""}>Scegli...</option>
                                    {Array.isArray(listaProvince) && listaProvince.map((val: any) =>
                                        <option value={val.codiceProvincia} >{val.descrizioneProvincia}</option>
                                    )}
                                </select>
                                <small className='text-danger'>{formErrors?.codiceProvincia}</small>
                            </div>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Comune<strong className='text-danger'>*</strong></label>

                                </div>
                                <select disabled={params.idFiltroPersonale!==undefined} name='idVoceMenuPadre' className={formErrors?.codiceComune != undefined ? "form-control is-invalid" : "form-control"} onChange={(event: any) => { setCodiceComune(event.target.value) }} value={codiceComune}>
                                    <option value={""}>Scegli...</option>
                                    {Array.isArray(listaComuni) && listaComuni.map((val: any) =>
                                        <option value={val.codiceComune} >{val.descrizioneComune}</option>
                                    )}
                                </select>
                                <small className='text-danger'>{formErrors?.codiceComune}</small>
                            </div>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>CAP<strong className='text-danger'>*</strong></label>

                                </div>
                                <input disabled={params.idFiltroPersonale!==undefined} name='nome' type={"text"} onChange={(e: any) => setCap(e.currentTarget.value)} className={formErrors?.cap != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci il nome"} value={cap} />

                                <small className='text-danger'>{formErrors?.cap}</small>
                            </div>

                            <div className={"col-12 pt-3"}>
                                <div className='d-flex flex-row align-items-center justify-content-between'>
                                    <label>Indirizzo<strong className='text-danger'>*</strong></label>

                                </div>
                                <input disabled={params.idFiltroPersonale!==undefined} name='nome' type={"text"} onChange={(e: any) => setIndirizzo(e.currentTarget.value)} className={formErrors?.indirizzo != undefined ? "form-control is-invalid" : "form-control"} placeholder={"Inserisci un indirizzo"} value={indirizzo} />

                                <small className='text-danger'>{formErrors?.indirizzo}</small>
                            </div>

                            {

                                params.idFiltroPersonale === undefined && indirizzo !== "" && codiceRegione !== "null" && codiceProvincia !== "" && codiceComune !== "" && <div className={"col-12 pt-3 d-grid gap-2"}><span onClick={getCoordinateDatoIndirizzo} className='btn btn-block btn-primary'>Conferma indirizzo</span></div>

                            }



                            {latitudine !== "" && longitudine !== "" && <div className={"col-12 pt-3"}>

                                <MapContainer center={[latitudine, longitudine]} zoom={13} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[latitudine, longitudine]}>
                                        <Popup>
                                            {indirizzo}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>}

                        </>}



                    </div>
                </div>
            </div>
        </Layout >
    );

}


