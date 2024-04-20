import React from 'react';
import Context from '../context/Context';
import { requestProducts, requestUpdateProducts } from '../services/requests';
import { INewProductsModel } from '../interfaces/INewProductsModel';
import checkImg from '../assets/check-mark.png';

interface IvalidarCSV {
    texto: string;
    styleName: string;
}

const Formulario: React.FC = () => {
    const [msgTela, setMsgTela] = React.useState<string>('');
    const [formatoSaida, setFormatoSaida] = React.useState<INewProductsModel[]>([]);
    const [tabVis, setTabVis] = React.useState<boolean>(false);
    const [validarCSV, setValidarCSV] = React.useState<IvalidarCSV>({
        texto: '',
        styleName: '',
    });
    const { saida, btnAtualizar, entrada, setEntrada, setBtnAtualizar } = React.useContext(Context);

    const handleArquivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const file = event.target.files?.[0];
        if (file?.type !== 'text/csv') {
            setValidarCSV({
                texto: 'Arquivo inválido! Utilize somente arquivos csv.',
                styleName: 'arquivo-csv-invalido',
            });
            setEntrada({
                produtos: [],
                styleName: '',
            });
        } else {
            setValidarCSV({
                texto: 'Arquivo válido!',
                styleName: 'arquivo-csv-valido',
            });

            reader.onload = (e) => {
                const contents = e.target?.result as string;
                const lines = contents.split(/\r?\n/);

                const data = lines.map((line: string) => ({
                    product_code: line.split(',')[0],
                    new_price: line.split(',')[1],
                }))
                    .filter((_item, index) => index > 0 && index < lines.length - 1);

                setEntrada({
                    produtos: data,
                    styleName: 'entrada-visivel',
                });
            };

            reader.readAsText(file as Blob);
        }
    };

    const newEntrada = () => entrada.produtos.map((item:
        {
            product_code: string;
            new_price: string;
        }) => ({
            product_code: String(item.product_code),
            new_price: String(item.new_price),
        }));


    const handleValidarClick = async () => {
        if (validarCSV.styleName === 'arquivo-csv-valido') {
            const data = await requestProducts('/products', newEntrada());
            setFormatoSaida(data as INewProductsModel[]);
            setTabVis(true);
            setBtnAtualizar(!data.every((elemento) => elemento.atualizar === true));
        }
        new FileReader();
    };

    const limparDadosETela = () => {
        setFormatoSaida([]);
        setTabVis(false);
        setValidarCSV({
            texto: '',
            styleName: '',
        });
        setEntrada({
            produtos: [],
            styleName: '',
        });
        setBtnAtualizar(true);
        new FileReader();
        const arquivoInput = document.querySelector<HTMLInputElement>('#arquivo');
        if (arquivoInput) {
            arquivoInput.value = '';
        }
    };

    const handleAtualizarClick = async () => {
        const updatesTableProducts = await requestUpdateProducts('/updateproducts', newEntrada());
        setFormatoSaida([]);
        setTabVis(false);
        setValidarCSV({
            texto: '',
            styleName: '',
        });
        setEntrada({
            produtos: [],
            styleName: '',
        });
        setBtnAtualizar(true);
        new FileReader();
        const arquivoInput = document.querySelector<HTMLInputElement>('#arquivo');
        if (arquivoInput) {
            arquivoInput.value = '';
        }
        setMsgTela(JSON.parse(JSON.stringify(updatesTableProducts)).mensagem);
        setTimeout(() => {
            setMsgTela('');
        }, 10000);
    };

    return (
        <section>
            <h1>Ferramenta para atualizar preços</h1>
            <section className='arquivo-precificacao'>
                <label htmlFor="arquivo">Arquivo de precificação* :</label>
                <input type="file" id="arquivo" onChange={handleArquivoChange} />
                <div className={validarCSV.styleName}>{validarCSV.texto}</div>
                <input type="submit" id="limpar_tela_dados" className='limpar-tela-dados' value='Limpar' onClick={limparDadosETela} />
            </section>
            <section>
                <button id='validar' onClick={handleValidarClick}>VALIDAR</button>
                <button id='atualizar' onClick={handleAtualizarClick} disabled={btnAtualizar}>ATUALIZAR</button>
            </section>
            {tabVis && <section className={saida.styleName}>
                <div id="saida">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Preço Atual</th>
                                <th>Novo Preço</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formatoSaida.map((item, index: number) => {
                                    const validador = item.arquivo_CSV_valido_compras.resposta === 'sim' && item.campos_necessarios_existem.resposta === 'sim' && item.produto_informado_existe.resposta === 'sim' && item.valores_numericos_validos.resposta === 'sim' && item.respeita_as_regras_financeiro.resposta === 'sim' && item.respeita_as_regras_marketing.resposta === 'sim' && item.respeita_as_regras_produtos_pacotes.resposta === 'sim';

                                    return (
                                        <tr key={index}>
                                            <td>{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.sales_price}</td>
                                            <td>{item.new_price}</td>
                                            <td>
                                                {
                                                    validador && <img src={checkImg} width={25} alt='Imagem check Ok' />
                                                }

                                                <div>
                                                    {
                                                        item.arquivo_CSV_valido_compras.resposta === 'não' &&
                                                        <div>
                                                            - {
                                                                item.arquivo_CSV_valido_compras.msg
                                                            }
                                                        </div>
                                                    }

                                                    {
                                                        item.campos_necessarios_existem.resposta === 'não' &&
                                                        <div>
                                                            - {item.campos_necessarios_existem.msg}
                                                        </div>
                                                    }

                                                    {
                                                        item.produto_informado_existe.resposta === 'não' &&
                                                        <div>
                                                            - {item.produto_informado_existe.msg}
                                                        </div>
                                                    }

                                                    {
                                                        item.valores_numericos_validos.resposta === 'não' &&
                                                        <div>
                                                            - {item.valores_numericos_validos.msg}
                                                        </div>
                                                    }

                                                    {
                                                        item.respeita_as_regras_financeiro.resposta === 'não' &&
                                                        <div>
                                                            - {item.respeita_as_regras_financeiro.msg}
                                                        </div>
                                                    }

                                                    {
                                                        item.respeita_as_regras_marketing.resposta === 'não' &&
                                                        <div>
                                                            - {item.respeita_as_regras_marketing.msg}
                                                        </div>
                                                    }

                                                    {
                                                        item.respeita_as_regras_produtos_pacotes.resposta === 'não' &&
                                                        <div>
                                                            - {item.respeita_as_regras_produtos_pacotes.msg}
                                                        </div>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>}
            {msgTela === '' ? '' : <div className='msg-final'>{msgTela}!!!</div>}
            <span className='explicar-1'>* utilizar somente arquivo csv</span>
        </section>
    );
};

export default Formulario;