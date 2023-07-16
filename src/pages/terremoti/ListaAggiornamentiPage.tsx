import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import utentiService from '../../services/UtentiService';
import { getData, getDataMenoXGiorniPrecedenti, getOra } from '../../DateUtil';
import terremotiService from '../../services/TerremotiService';
import { fetchIsLoadingAction } from '../../modules/feedback/actions';

export default function ListaAggiornamentiPage() {

    const utenteLoggato = useSelector((state: any) => state.utenteLoggato);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ricercaEseguita, setRicercaEseguita] = React.useState(false);
    const [utenti, setUtenti] = React.useState([]);
    const [paginaUtente, setPaginaUtente] = React.useState(1);

    const [dataInizioIntervallo, setDataInizioIntervallo] = React.useState(getDataMenoXGiorniPrecedenti(7).toISOString().substring(0, 10));
    const [dataFineIntervallo, setDataFineIntervallo] = React.useState(new Date().toISOString().substring(0, 10));

    const getUtenti = async (pagina: any) => {

        if (pagina !== 0) {

            await terremotiService.getCronJobs(utenteLoggato.token, pagina).then(response => {
                if (response.data.length !== 0) {
                    setUtenti(response.data);
                    setPaginaUtente(pagina);
                } else if (pagina == 1 && response.data.length === 0) {
                    toast.warning("Non sono stati trovati utenti", {
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
            setRicercaEseguita(true);
            getUtenti(paginaUtente);
        }
    }, []);

    return (
        <Layout>

            <div className="card shadow-lg mx-2 mt-3">
                <div className="card-header pb-0">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="">
                            <i className="fa-solid fa-list text-primary fa-1x pe-2 "></i>
                            Lista aggiornamenti
                        </h3>

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
                                            <th scope="col">Data</th>
                                            <th scope="col">Ora</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Array.isArray(utenti) && utenti.map((utente: any, index: number) =>
                                                <tr key={index}>
                                                    <th className='text-center' scope="row">{utente.idCronJob}</th>
                                                    <td>{getData(utente.dataEvento)}</td>
                                                    <td>{getOra(utente.dataEvento)}</td>
                                            
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