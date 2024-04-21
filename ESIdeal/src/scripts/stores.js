import { defineStore } from 'pinia';

import * as DBRequests from './DBrequests.js';
import * as ServiceInfo from'../models/ServicesInfo.js';
import { EstadoServico } from '../models/consts.js';
export const serviceState = defineStore('dbData', {
    state: () => ({
        onGoingService: null, // guarda serviço a decorrer se houver
        serviceDefinitions: [], // obtidos de partida todos, porque são poucos e nunca mudam
        serviceTypes: [], // obtidos de partida todos, porque são poucos e nunca mudam
        servicesWithBaseData: [], // array com dados base de serviços incompletos para a página de serviços atribuídos
        servicesWithFullData: [],
    }),
    getters: { //funções de get
        servicesToComplete() {
            return this.servicesWithBaseData.filter(service => service.estado !== EstadoServico.REALIZADO)
        }
    },

    actions: {
    // ### FUNCS AUXILIARES

       async addOnGoingService(serviceId) {
            this.onGoingService = await this.getServiceBaseInfo(serviceId)
        },
        
        clearOnGoingService() {
            this.onGoingService = null
        },

        //recebe entrada da tabela serviços da base de dados
        //preencher campos relativos a tipo de servico,nome, duração com base em dados pré-carregados no store
        fillServiceData(service) {
            // Map service data
            const serviceDefinition = this.serviceDefinitions.find(def => def.id === service["service-definitionId"]);
            const foundServiceTypes = this.serviceTypes.filter(type => type.serviços.includes(service["service-definitionId"]));
            const serviceTypes = foundServiceTypes.map(type => type.id);

            const date = new Date(service.data?.ano, service.data?.mes - 1, service.data?.dia, service.data?.hora, service.data?.minutos)

            const baseService = new ServiceInfo.ServiceBaseInfo(service.id,service.estado, service.agendamento, service["descrição"],service.vehicleId, 
                date, service["service-definitionId"], serviceDefinition?.descr, serviceDefinition?.duração,
                serviceTypes);
            
            this.servicesWithBaseData.push(baseService)

            return baseService
        },

    // ### FUNCS A CAHAMAR
        // só carega dados estáticos da base de dados
        async loadStaticDBdata() {
            try {
                this.serviceDefinitions = await DBRequests.fetchServiceDefinitions();
                this.serviceTypes = await DBRequests.fetchVehicleTypes();

            } catch (error) {
                console.error("Error loading static DB data:", error)
            }
        },   
        // carregar dados estáticos da base de dados e serviços incompletos
        async loadDBdata() {
            try {
                this.serviceDefinitions = await DBRequests.fetchServiceDefinitions();
                this.serviceTypes = await DBRequests.fetchVehicleTypes();
                this.servicesWithBaseData = await DBRequests.fetchServicesWithState(["programado","nafila","parado"]); // isto devia ser uma call separada se calhar?, depende se achamos que vão aparecer serviços durante o decorrer do programa
            
                this.servicesWithBaseData = this.servicesWithBaseData.map(this.fillServiceData);

            } catch (error) {
                console.error("Error loading base DB data:", error)
            }
        },

        //obter detalhes inteiros de serviço
        async getServiceDetails(idService){
            try {
                let service = this.servicesWithFullData.find(serv => serv.id === idService)

                if (!service) { // se serviço com informação total não estiver guardado
                    service = this.servicesWithBaseData.find(serv => serv.id === idService)

                    if (!service) { // se serviço base não estiver guardado
                        service = await DBRequests.fetchServiceById(idService);
                        service = this.fillServiceData(service)
                    }

                    const vehicle = await DBRequests.fetchVehicleById(service.id_veiculo)
                    const client = await DBRequests.fetchClientById(vehicle.clientId)
                    let historyServices = await DBRequests.fetchServicesByVehicle(vehicle.id)
                    historyServices = historyServices.map(this.fillServiceData);

                    service = new ServiceInfo.ServiceFullInfo(service.id,service.estado, service.agendamento, service.descricao_especifica, service.data,
                        service.def_servico?.id, service.def_servico?.descricao, service.def_servico?.duracao, service.tipos_servico, service.id_veiculo,
                        vehicle?.marca, vehicle?.modelo, vehicle?.medidasJantes, vehicle?.["vehicle-typeId"], vehicle?.potencia, vehicle?.kms, vehicle?.cilindrada,
                        client?.id, client?.nome, client?.email, client?.telefone, historyServices)
                        
                    this.servicesWithFullData.push(service)
                }

                return service

            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }
        },

        async getServiceBaseInfo(idService) {
            try {
                const service = this.servicesWithBaseData.find(serv => serv.id === idService)
                if (!service) {
                    service = await DBRequests.fetchServiceById(idService);
                    service = fillServiceData(service)

                    this.servicesWithBaseData.push(service)
                }
                return service

            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }
        },

        updateServiceState(idService, state) {
            var service = this.servicesWithBaseData.find(serv => serv.id === idService)
            service.estado = state

        }
    },
});