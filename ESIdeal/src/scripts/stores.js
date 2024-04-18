import { defineStore } from 'pinia';

import * as DBRequests from './DBrequests.js';
import { ServiceBaseInfo } from '../models/ServiceBaseInfo.js';
export const serviceState = defineStore('message', {
    state: () => ({
        onGoingService: false,
        serviceDefinitions: [], // obtidos de partida todos, porque são poucos e nunca mudam
        serviceTypes: [], // obtidos de partida todos, porque são poucos e nunca mudam
        servicesToComplete: [], // array com dados base de serviços incompletos para a página de serviços atribuídos
    }),
    getters: { //funções de get

        async getServiceDetails(id) {
            try {
                const service = this.servicesToComplete.find(service => service.id === id);
                const vehicle = await DBRequests.fetchVehicleById(service.vehicleId)
                const client = await DBRequests.fetchClientById(service.vehicle.clientId)
                const historyServices = await DBRequests.fetchServicesByVehicle(vehicle.id)

                service.vehicle = vehicle;
                service.client = client;
                service.historyServices = historyServices;
                return service;
            } catch (error) {
                console.error("Error loading DB data for specific service:", error)
            }
        }
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
            
                this.servicesToComplete = this.servicesToComplete.map(service => {
                    service.serviceDefinition = this.serviceDefinitions.find(def => def.id === service["service-definitionId"]);
                    const foundServiceTypes = this.serviceTypes.filter(type => type.serviços.includes(service["service-definitionId"]))
                    service.serviceTypes = foundServiceTypes.map(type => type.id);
                    return new ServiceBaseInfo(service)
                });
            } catch (error) {
                console.error("Error loading DB data for incomplete services:", error)
            }
        }
    },
});