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
import { getIcon, radarIcon } from '../../components/Markers';
export default function FiltroMappaTerremotiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [lista, setLista] = React.useState<any>([]);

    const [magnitudo, setMagnitudo] = React.useState(2);

    const eseguiRicerca = async (lat: any, lon: any) => {
        dispatch(fetchIsLoadingAction(true));


        await terremotiService.getTerremotiPerMappaFiltro(utenteLoggato.token, magnitudo, lat, lon, raggio).then(response => {
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

    const [latitudineGlobale, setLatitudineGlobale] = React.useState(42.29);
    const [longitudineGlobale, setLongitudineGlobale] = React.useState(11.95);


    const aggiornaMagnitudo = (event: any) => {
        setMagnitudo(event.target.value);
    };

    const [raggio, setRaggio] = React.useState(30);

    const aggiornaRaggio = (event: any) => {
        setRaggio(event.target.value);
    };

    const center = {
        lat: latitudineGlobale,
        lng: longitudineGlobale,
    }

    function DraggableMarker() {
        const [draggable, setDraggable] = React.useState(false)
        const [position, setPosition] = React.useState(center)
        const markerRef = React.useRef(null)
        const eventHandlers = React.useMemo(
            () => ({
                dragend() {
                    const marker: any = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                        console.info(marker.getLatLng());


                    }
                },
            }),
            [],
        )
        const toggleDraggable = React.useCallback(() => {
            setDraggable((d) => !d);
            const marker: any = markerRef.current
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
        }, [])

        const usaCoordinate = () => {
            const marker: any = markerRef.current
            console.info(+"USO COORDINATE" + marker.getLatLng());
            setLatitudineGlobale(marker.getLatLng().lat);
            setLongitudineGlobale(marker.getLatLng().lng);
            eseguiRicerca(marker.getLatLng().lat, (marker.getLatLng().lng));
        }

        return (
            <Marker icon={radarIcon}
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup >
                    <div className='text-center'>
                        <span>Latitudine: {latitudineGlobale.toFixed(2)} Longitudine: {longitudineGlobale.toFixed(2)}</span>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? <span className='btn btn-outline-primary'>Conferma posizione</span>
                                : <span className='btn btn-primary'>Clicca per poter spostare il marker</span>}
                        </span>
                        {!draggable && <span className='btn btn-primary mt-1' onClick={usaCoordinate}>
                            Cerca in quest'area
                        </span>}
                    </div>
                </Popup>
            </Marker>
        )
    }

    useEffect(() => {

    }, []);

    return (
        <Layout>

            <div className='row'>
                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h3 className="">
                                <i className="fa-solid fa-filter text-primary fa-1x pe-2 "></i>
                                Filtri
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Raggio: {raggio}km</label>
                                    <input type={"range"} onChange={aggiornaRaggio} className={"form-control"} value={raggio} min={1} max={100} step={0.1} />
                                </div>

                                <div className='col-6'>
                                    <label>Magnitudo: {magnitudo}</label>
                                    <input type={"range"} onChange={aggiornaMagnitudo} className={"form-control"} value={magnitudo} min={0} max={10} step={0.1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='col-12'>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h3 className="">
                                <i className="fa-solid fa-map-location-dot text-primary fa-1x pe-2 "></i>
                                Mappa
                            </h3>                        </div>
                        <div className="card-body">
                            <MapContainer center={[41.60897592585041, 12.593894063067715]} zoom={5} scrollWheelZoom={false} >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

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

                                <DraggableMarker />

                            </MapContainer>
                        </div>
                    </div>


                </div>
            </div>

        </Layout >
    );

}