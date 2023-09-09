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
import { getData, getOra } from '../../DateUtil';


export default function SchedaTerremotoPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const dispatch = useDispatch();
    const params = useParams();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);

    const [listaLuoghiPersonali, setListaLuoghiPersonali] = React.useState([]);
    const [listaComuni, setListaComuni] = React.useState([]);
    const [terremoto, setTerremoto] = React.useState<any>();

    const [paginaComuni, setPaginaComuni] = React.useState(1);
    const [paginaLuoghi, setPaginaLuoghi] = React.useState(1);

    let navigate = useNavigate();

    const getTerremoto = async () => {
        dispatch(fetchIsLoadingAction(true));
        await terremotiService.getTerremoto(utenteLoggato.token, params.id).then(response => {
            console.info(response.data);
            setTerremoto(response.data);
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

    const getDistanzaComuniDatoTerremoto = async (pagina: any) => {

        if (pagina !== 0) {
            await terremotiService.getDistanzaComuniDatoTerremoto(utenteLoggato.token, params.id, pagina).then(response => {
                if (response.data.length !== 0) {
                    setListaComuni(response.data);
                    setPaginaComuni(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setPaginaComuni(pagina);
                    toast.warning("Non sono stati trovati comuni", {
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

    const getDistanzaLuoghiPersonaliDatoTerremoto = async (pagina: any) => {
        if (pagina !== 0) {
            await terremotiService.getDistanzaLuoghiPersonaliDatoTerremoto(utenteLoggato.token, params.id, pagina).then(response => {
                if (response.data.length !== 0) {
                    setListaLuoghiPersonali(response.data);
                    setPaginaLuoghi(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    setPaginaLuoghi(pagina);
                    toast.warning("Non sono stati trovati luoghi personali", {
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
            if (params.id !== undefined) {
                getTerremoto();
                getDistanzaComuniDatoTerremoto(1);
                getDistanzaLuoghiPersonaliDatoTerremoto(1);
            } else {

            }
            setRicercaEseguita(true);
        }
    });


    return (
        <Layout>

            <div className="card shadow-lg mx-2 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className='fa-solid fa-circle-info pe-2 text-primary'></i>
                            {terremoto !== undefined ? "Dettagli terremoto n. " + terremoto.id : ""}
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className={"col-12"}>
                            {terremoto !== undefined &&

                                <MapContainer center={[terremoto.latitude, terremoto.longitude]} zoom={10} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[terremoto.latitude, terremoto.longitude]}>
                                        <Popup>
                                            <div className='text-center'>
                                                <span className='text-center'>
                                                    <span className='h5'>{terremoto.magnitude}</span>{terremoto.magType}<br />

                                                </span>
                                                {terremoto.eventLocationName}<br />
                                                <span>Ipocentro a {terremoto.depth} Km</span><br />
                                                {getOra(terremoto.time) + " del " + getData(terremoto.time)}
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            }
                        </div>


















                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-2 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className='fa-solid fa-city pe-2 text-primary'></i>

                            Elenco dei comuni nei pressi dell'epicentro
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className='row'>
                        <div className='col-12'>
                            <div className='table-responsive'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Distanza</th>
                                            <th scope="col">Comune</th>
                                            <th scope="col">Provincia</th>
                                            <th scope="col">Regione</th>
                                            <th scope="col">N. abitanti</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(listaComuni) && listaComuni.map((comune: any, index: number) =>
                                                <tr key={index}>
                                                    <td>{comune.distanza} Km</td>
                                                    <td>{comune.descrizioneComune}</td>
                                                    <td>{comune.descrizioneProvincia}</td>
                                                    <td>{comune.descrizioneRegione}</td>
                                                    <td>{comune.residenti}</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaComuni}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getDistanzaComuniDatoTerremoto(paginaComuni - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getDistanzaComuniDatoTerremoto(paginaComuni + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg mx-2 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className='fa-solid fa-home pe-2 text-primary'></i>

                            Elenco dei luoghi personali
                        </h3>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className='row'>
                        <div className='col-12'>
                            <div className='table-responsive'>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Distanza</th>
                                            <th scope="col">Indirizzo</th>
                                            <th scope="col">Comune</th>
                                            <th scope="col">Provincia</th>
                                            <th scope="col">Regione</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(listaLuoghiPersonali) && listaLuoghiPersonali.map((comune: any, index: number) =>
                                                <tr key={index}>
                                                    <td>{comune.distanza} Km</td>
                                                    <td>{comune.indirizzo}</td>
                                                    <td>{comune.descrizioneComune}</td>
                                                    <td>{comune.descrizioneProvincia}</td>
                                                    <td>{comune.descrizioneRegione}</td>

                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaLuoghi}</small>
                        </div>

                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getDistanzaLuoghiPersonaliDatoTerremoto(paginaLuoghi - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getDistanzaLuoghiPersonaliDatoTerremoto(paginaLuoghi + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );

}


