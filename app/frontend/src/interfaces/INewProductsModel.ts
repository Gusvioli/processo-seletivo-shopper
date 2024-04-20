interface IRespostMsg {
    resposta: string,
    msg: string,
    mensagem: string,
}

export interface INewProductsModel {
    code: number,
    nome?: string,
    name?: string,
    new_price: number,
    atualizar: boolean,
    sales_price: number,
    mensagem: IRespostMsg,
    pack_id?: number,
    qty?: string,
    id_pack?: string,
    respeita_as_regras_financeiro: IRespostMsg,
    respeita_as_regras_marketing: IRespostMsg,
    respeita_as_regras_produtos_pacotes: IRespostMsg,
    arquivo_CSV_valido_compras: IRespostMsg,
    campos_necessarios_existem: IRespostMsg,
    produto_informado_existe: IRespostMsg,
    valores_numericos_validos: IRespostMsg,
} 