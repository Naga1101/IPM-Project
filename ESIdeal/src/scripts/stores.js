import { defineStore } from 'pinia';

import * as DBRequests from './DBrequests.js';
import * as ServiceInfo from'../models/ServicesInfo.js';
export const serviceState = defineStore('message', {
    state: () => ({
        onGoingService: false,
        serviceDefinitions: [], // obtidos de partida todos, porque são poucos e nunca mudam
        serviceTypes: [], // obtidos de partida todos, porque são poucos e nunca mudam
        servicesToComplete: [], // array com dados base de serviços incompletos para a página de serviços atribuídos
    }),
    getters: { //funções de get
    },

    actions: {
        async toggleOnGoingService() {
            this.onGoingService = !this.onGoingService;
        },
        
        async loadDBdata() {
            try {
                this.serviceDefinitions = await DBRequests.fetchServiceDefinitions();
                this.serviceTypes = await DBRequests.fetchVehicleTypes();
                this.servicesToComplete = await DBRequests.fetchServicesToComplete(); // isto devia ser uma call separada se calhar?, depende se achamos que vão aparecer serviços durante o decorrer do programa
            
                this.servicesToComplete = this.servicesToComplete.map(service => { // como fazer com que isto use getServiceBaseInfo??
                    service.serviceDefinition = this.serviceDefinitions.find(def => def.id === service["service-definitionId"]);
                    const foundServiceTypes = this.serviceTypes.filter(type => type.serviços.includes(service["service-definitionId"]))
                    service.serviceTypes = foundServiceTypes.map(type => type.id);
                    return new ServiceInfo.ServiceBaseInfo(service)
                })
            } catch (error) {
                console.error("Error loading DB data for incomplete services:", error)
            }
        },

        // dado ServiceBaseInfo acrescenta o que falta, para criar ServiceBaseInfo
        async buildServiceDetails(service) { 
            try {
                const vehicle = await DBRequests.fetchVehicleById(service.id_veiculo)
                const client = await DBRequests.fetchClientById(vehicle.clientId)
                const historyServices = await DBRequests.fetchServicesByVehicle(vehicle.id)

                service.vehicle = vehicle;
                service.client = client;
                service.historyServices = historyServices;

                return new ServiceInfo.ServiceFullInfo(service)

            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }
        },

        async getServiceBaseInfo(service) {
            try {
                service.serviceDefinition = this.serviceDefinitions.find(def => def.id === service["service-definitionId"]);
                const foundServiceTypes = this.serviceTypes.filter(type => type.serviços.includes(service["service-definitionId"]))
                service.serviceTypes = foundServiceTypes.map(type => type.id);
                return new ServiceBaseInfo(service)
            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }
        },

        // assume que é serviço não concluído carregado da base de dados de início
        async getServiceDetailsFromLocal(idService) { // recebe dados raw da DB de serviço
            try {
                // service.serviceDefinition = this.serviceDefinitions.find(def => def.id === service["service-definitionId"]);
                // const foundServiceTypes = this.serviceTypes.filter(type => type.serviços.includes(service["service-definitionId"]))
                // service.serviceTypes = foundServiceTypes.map(type => type.id);
                // baseInfo = new ServiceBaseInfo(service)
                console.log(idService)
                const service = this.servicesToComplete.find(service => service.id === idService)
                console.log(service)
                const vehicle = await DBRequests.fetchVehicleById(service.id_veiculo)
                const client = await DBRequests.fetchClientById(vehicle.clientId)
                const historyServices = await DBRequests.fetchServicesByVehicle(vehicle.id)

                service.vehicle = vehicle;
                service.client = client;
                service.historyServices = historyServices;

                return new ServiceInfo.ServiceFullInfo(service)

            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }

        },

        // qualquer serviço carregado da base de dados diretamente
        async getServiceDetailsFromRemote(idService) { // recebe dados raw da DB de serviço
           // TODO:
        }
    },
});