import {TiposVeiculo, AgendamentoServico, EstadoServico} from "./consts.js";

export class ServiceBaseInfo {
    constructor(data) {
        this.id = data.id || "";
        this.estado = EstadoServico[data.estado.toUpperCase()] || null;
        this.agendamento = AgendamentoServico[data.agendamento.toUpperCase()] || null;
        this.descricao_especifica = data["descrição"] || "";  // tem caratéres especiais, usar parentesis curvos
        this.id_veiculo = data.vehicleId || "";
        this.data = new Date(data.data?.ano, data.data?.mes - 1, data.data?.dia, data.data?.hora, data.data?.minutos) || null; // Assuming you want to set the current date as default
        this.def_servico = {
            id: data["service-definitionId"] || "",
            descricao: data.serviceDefinition?.descr || "",
            duracao: data.serviceDefinition?.duração || ""
        };
        this.tipos_servico = data.serviceTypes.map(type => TiposVeiculo[type.toUpperCase()]) || [];
    }
}

// já assume que recebeu dados do ServiceBaseInfo, daí estar ligeiramente estranho -> temporario
export class ServiceFullInfo {
    constructor(data) {
        this.id = data.id || "";
        this.estado = data.estado || null;
        this.agendamento = data.agendamento || null;
        this.descricao_especifica = this.descricao_especifica || "";  // tem caratéres especiais, usar parentesis curvos
        this.data = data.data || null;
        this.def_servico = {
            id: data.def_servico.id,
            descricao: data.def_servico.descricao,
            duracao: data.def_servico.duracao
        };
        this.tipos_servico = Array.from(data.tipos_servico) || []
        this.veiculo = {
            id: data.id_veiculo || "",
            marca: data.vehicle?.marca || "",
            modelo: data.vehicle?.modelo || "",
            medidasJantes: data.vehicle?.medidasJantes || "",
            // tirei daqui o id_cliente, está acessível no cliente.id
            tipo: TiposVeiculo[data.vehicle["vehicle-typeId"].toUpperCase()] || null,
            potencia: data.vehicle?.potencia || "",
            kms: data.vehicle?.kms || "",
            cilindrada: data.vehicle?.cilindrada || ""
        }
        this.cliente = {
            id: data.client?.id || "",
            nome: data.client?.nome || "",
            email: data.client?.email || "",
            telefone: data.client?.telefone || ""
        }
        this.historico = data.historyServices || []
    }
}

export const ServiceInfoPlugin = {
    install(Vue) {
      Vue.prototype.$ServiceInfo = {
        ServiceBaseInfo,
        ServiceFullInfo
      };
    }
  };