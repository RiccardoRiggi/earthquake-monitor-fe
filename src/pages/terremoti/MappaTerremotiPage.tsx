import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import utentiService from '../../services/UtentiService';
import { getData, getDataMenoXGiorniPrecedenti, getOra } from '../../DateUtil';
import terremotiService from '../../services/TerremotiService';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';


import { MapContainer } from '../../../node_modules/react-leaflet/lib/MapContainer'
import { TileLayer } from '../../../node_modules/react-leaflet/lib/TileLayer'
import { Popup } from '../../../node_modules/react-leaflet/lib/Popup'
import { Marker } from '../../../node_modules/react-leaflet/lib/Marker'
import { getIcon } from '../../components/Markers';

import MarkerClusterGroup from 'react-leaflet-cluster'

export default function MappaTerremotiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [lista, setLista] = React.useState<any>([]);

    const [magnitudo, setMagnitudo] = React.useState(2);
    const [dataInizioIntervallo, setDataInizioIntervallo] = React.useState(getDataMenoXGiorniPrecedenti(7).toISOString().substring(0, 10));
    const [dataFineIntervallo, setDataFineIntervallo] = React.useState(new Date().toISOString().substring(0, 10));

    const eseguiRicerca = async () => {
        dispatch(fetchIsLoadingAction(true));


        await terremotiService.getTerremotiPerMappaGenerale(utenteLoggato.token, magnitudo, dataInizioIntervallo, dataFineIntervallo).then(response => {
            if (response.data.length !== 0) {
                setLista(response.data);
            } else {
                toast.warning("Non sono stati trovati utenti", {
                    position: "top-center",
                    autoClose: 5000,
                });
                setLista([]);
            }
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





    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            eseguiRicerca();
        }
    }, []);

    return (
        <Layout>

            <div className='row'>
                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="">
                                <i className="fa-solid fa-filter text-primary fa-1x pe-2 "></i>
                                Filtri
                            </h3>

                            <span className='btn btn-primary' onClick={eseguiRicerca}>Aggiorna mappa</span>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Dal:</label>
                                    <input type={"date"} onChange={(e: any) => setDataInizioIntervallo(e.currentTarget.value)} className={"form-control"} value={dataInizioIntervallo} />
                                </div>

                                <div className='col-6'>
                                    <label>Al:</label>
                                    <input type={"date"} onChange={(e: any) => setDataFineIntervallo(e.currentTarget.value)} className={"form-control"} value={dataFineIntervallo} />
                                </div>

                                <div className='col-12'>
                                    <label>Magnitudo: {magnitudo}</label>
                                    <input type={"range"} onChange={(e: any) => setMagnitudo(e.currentTarget.value)} className={"form-control"} value={magnitudo} min={0} max={10} step={0.1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 ">
                            <h3 className="">
                                <i className="fa-solid fa-map-location-dot text-primary fa-1x pe-2 "></i>
                                Mappa
                            </h3>
                        </div>
                        <div className="card-body">
                            <MapContainer center={[41.60897592585041, 12.593894063067715]} zoom={5} scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MarkerClusterGroup >
                                    {Array.isArray(lista) && lista.map((elemento: any, index: number) =>
                                        <span key={index}>
                                            <Marker icon={getIcon(elemento.magnitude)} position={[elemento.latitude, elemento.longitude]}>
                                                <Popup>
                                                    <div className='text-center'>
                                                        <span className='text-center'>
                                                            <span className='h5'>{elemento.magnitude}</span>{elemento.magType}<br />
                                                        </span>
                                                        {elemento.eventLocationName}<br />{getOra(elemento.time) + " del " + getData(elemento.time)}
                                                        <br /><Link to={"/terremoti/" + elemento.id}>Visualizza dettagli</Link>

                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </span>
                                    )}
                                </MarkerClusterGroup>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

        </Layout >
    );

}