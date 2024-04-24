import {TiposVeiculo, AgendamentoServico, EstadoServico} from "./consts.js";

export class ServiceBaseInfo {
    constructor(service_id, estado, agendamento, descricao, id_veiculo, data, serv_id, 
            serv_descricao, serv_duracao, tipos_servico,
            notas_concluido, razao_suspensao, data_conclusao) {
        this.id = service_id || "";
        this.estado = EstadoServico[estado.toUpperCase()] || null;
        this.agendamento = AgendamentoServico[agendamento.toUpperCase()] || null;
        this.descricao_especifica = descricao || "";  // tem caratéres especiais, usar parentesis curvos
        this.id_veiculo = id_veiculo || "";
        this.data = data || null; // Assuming you want to set the current date as default
        this.def_servico = {
            id: serv_id || "",
            descricao: serv_descricao || "",
            duracao: serv_duracao || ""
        };
        this.tipos_servico = Array.from(tipos_servico) || [];
        this.notas_concluido = notas_concluido || "",
        this.razao_suspensao = razao_suspensao || "",
        this.data_conclusao = data_conclusao || ""
    }
}

// já assume que recebeu dados do ServiceBaseInfo, daí estar ligeiramente estranho -> temporario
export class ServiceFullInfo {
    constructor(service_id, estado, agendamento, descricao, data, serv_id, serv_descricao, 
            serv_duracao, tipos_servico, veiculo_id, veiculo_marca, veiculo_modelo, veiculo_jantes, 
            veiculo_tipo, veiculo_potencia, veiculo_kms, veiculo_cilindrada, cliente_id, cliente_nome, 
            cliente_email, cliente_telefone, servicos_historico, notas_concluido, razao_suspensao, data_conclusao) {
        this.id = service_id || "";
        this.estado = estado || null;
        this.agendamento = agendamento || null;
        this.descricao_especifica = descricao || ""; 
        this.data = data || null;
        this.def_servico = {
            id: serv_id || "",
            descricao: serv_descricao || "",
            duracao: serv_duracao || ""
        };
        this.tipos_servico = Array.from(tipos_servico) || [] // assume que já vem no formato correto
        this.veiculo = {
            id: veiculo_id || "",
            marca: veiculo_marca || "",
            modelo: veiculo_modelo || "",
            medidasJantes: veiculo_jantes || "",
            tipo: TiposVeiculo[veiculo_tipo.toUpperCase()] || null,
            potencia: veiculo_potencia || "",
            kms: veiculo_kms || "",
            cilindrada: veiculo_cilindrada || ""
        }
        this.cliente = {
            id: cliente_id || "",
            nome: cliente_nome || "",
            email: cliente_email || "",
            telefone: cliente_telefone || ""
        }
        this.historico = servicos_historico || [] // assumo que já vem no formato correto
        this.detalhes = {
            notas_concluido: notas_concluido || "",
            razao_suspensao: razao_suspensao || "",
            data_conclusao: data_conclusao || ""
        }
            
    }
}
