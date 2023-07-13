import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import utentiService from '../../services/UtentiService';
import { getData, getDataMenoXGiorniPrecedenti, getOra } from '../../DateUtil';
import terremotiService from '../../services/TerremotiService';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';

export default function ListaFiltriPersonaliPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [utenti, setUtenti] = React.useState([]);
    const [paginaUtente, setPaginaUtente] = React.useState(1);

    const [dataInizioIntervallo, setDataInizioIntervallo] = React.useState(getDataMenoXGiorniPrecedenti(7).toISOString().substring(0, 10));
    const [dataFineIntervallo, setDataFineIntervallo] = React.useState(new Date().toISOString().substring(0, 10));

    const getUtenti = async (pagina: any) => {
        dispatch(fetchIsLoadingAction(true));

        if (pagina !== 0) {

            await terremotiService.getFiltriPersonali(utenteLoggato.token, pagina).then(response => {
                if (response.data.length !== 0) {
                    setUtenti(response.data);
                    setPaginaUtente(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati utenti", {
                        position: "top-center",
                        autoClose: 5000,
                    });
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
    }





    useEffect(() => {
        if (!ricercaEseguita) {
            setRicercaEseguita(true);
            getUtenti(paginaUtente);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-4 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-tags text-primary fa-1x pe-2 "></i>
                            Gestione filtri
                        </h3>
                        <Link to="/filtri-personali" className='btn btn-primary'><i className="fa-solid fa-plus pe-2"></i>Nuovo filtro</Link>

                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="row gx-4">

                        <div className='col-12 '>
                            <div className='table-responsive'>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead >
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Data creazione</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Dettagli</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(utenti) && utenti.map((utente: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{utente.idFiltroPersonale} <i title={utente.descrizione} className='text-primary fa-solid fa-circle-info'></i></th>
                                                    <td>{getData(utente.dataCreazione)} - {getOra(utente.dataCreazione)}</td>
                                                    <td>{utente.nomeFiltro}</td>
                                                    <td>
                                                    {utente.idTipoFiltroPersonale=="MAGNITUDO" && <span> Eventi con magnitudo maggiore o uguale a {utente.magnitudo} </span>}
                                                    {utente.idTipoFiltroPersonale=="DISTANZA" && <span> Eventi con distanza minore o uguale a {utente.distanza} Km da {utente.indirizzo}, {utente.descrizioneComune} ({utente.codiceProvincia}) </span>}
                                                    {utente.idTipoFiltroPersonale=="MAGNITUDO_DISTANZA" && <span> Eventi con magnitudo maggiore o uguale a {utente.magnitudo} e con una distanza minore o uguale a {utente.distanza} Km da {utente.indirizzo}, {utente.descrizioneComune} ({utente.codiceProvincia}) </span>}

                                                    </td>
                                                    <td className='text-center'><Link to={"/terremoti/" + utente.id} className='btn btn-primary'><i className="fa-solid fa-circle-info"></i></Link></td>

                                                </tr>
                                            )}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12 text-end'>
                            <small>Pagina {paginaUtente}</small>
                        </div>
                        <div className='col-6 text-end pt-2'>
                            <span onClick={() => getUtenti(paginaUtente - 1)} className='btn btn-primary'><i className='fa-solid fa-angles-left pe-2'></i>Precedente</span>
                        </div>
                        <div className='col-6 text-start pt-2'>
                            <span onClick={() => getUtenti(paginaUtente + 1)} className='btn btn-primary'>Successivo<i className='fa-solid fa-angles-right ps-2'></i></span>
                        </div>
                    </div>
                </div>

            </div>


        </Layout >
    );

}