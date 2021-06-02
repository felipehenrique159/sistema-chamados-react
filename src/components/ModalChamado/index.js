import './modalChamado.css'
import {FiX} from 'react-icons/fi'

export default function ModalChamado({chamado,close}){
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={23} color="#FFF"s/> Voltar
                </button>

                <div>
                    <h2>Detalhes do chamado</h2>

                    <div className="row">
                        <span>
                            Cliente: <i>{chamado.cliente}</i>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Assunto: <i>{chamado.assunto}</i>
                        </span>

                        <span>
                            Cadastrado em: <i>{chamado.created}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: <i style={{color : '#FFF' , backgroundColor : chamado.status === 'Aberto' ? '#5cb85c' : '#999'}}>{chamado.status}</i>
                        </span>
                    </div>

                    {chamado.complemento !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {chamado.complemento}
                            </p>
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}