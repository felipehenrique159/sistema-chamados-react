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
                            Cliente: <a>{chamado.cliente}</a>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Assunto: <a>{chamado.assunto}</a>
                        </span>

                        <span>
                            Cadastrado em: <a>{chamado.created}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: <a style={{color : '#FFF' , backgroundColor : chamado.status === 'Aberto' ? '#5cb85c' : '#999'}}>{chamado.status}</a>
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