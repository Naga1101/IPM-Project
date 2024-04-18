import {TiposVeiculo, AgendamentoServico, EstadoServico} from "./consts.js";

export class ServiceBaseInfo {
    constructor(data) {
        console.log(data)
        this.id = data.id || "";
        this.estado = EstadoServico[data.estado.toUpperCase()] || "";
        this.agendamento = AgendamentoServico[data.agendamento.toUpperCase()] || "";
        this.descricao_especifica = data["descrição"] || "";  // tem caratéres especiais, usar parentesis curvos
        this.id_veiculo = data.vehicleId || "";
        this.data = new Date(); // Assuming you want to set the current date as default
        this.def_servico = {
            id: data["service-definitionId"] || "",
            descricao: data.serviceDefinition?.descr || "",
            duracao: data.serviceDefinition?.duração || ""
        };
        this.tipos_servico = data.serviceTypes.map(type => TiposVeiculo[type.toUpperCase()]) || [];
    }
}