const baseUrl = 'http://localhost:3000/';

// Funções de fetch básicas
export const fetchServicesWithState = async (states) => {
    const estadoQuery = states.map(state => `estado=${state}`).join('&');
    return fetch(baseUrl + `services?${estadoQuery}`) // devolve todos os serviços com estado não igual (ne) a "realizado"
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching services');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchServiceById = async (serviceId) => {
    return fetch(baseUrl + `services/${serviceId}`) // devolve todos os serviços com estado não igual (ne) a "realizado"
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching service');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchServiceDefinitions = async () => {
    return fetch( baseUrl + "service-definitions")
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching services');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchVehicleTypes = async () => {
    return fetch(baseUrl + "vehicle-types")
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching services');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchClientById = async (clientId) => {
    return fetch(baseUrl + `clients/${clientId}`)
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching client');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchServicesByVehicle = async (vehicleId) => {
    return fetch(baseUrl + `services?vehicleId=${vehicleId}`) // devolve todos os serviços com estado não igual (ne) a "realizado"
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching services');
        }
        else {
            
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchVehicleById = async (vehicleId) => {
    return fetch(baseUrl + `vehicles/${vehicleId}`)
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching vehicle');
        }
        else {
            return response.json()
        }
    })
    .catch(error => console.log(error))
}

export const fetchUserLogin = async (userValue) => {
    return fetch(baseUrl + `logins?user=${userValue}`)
    .then (response => {
        if (!response.ok) {
            throw new Error('Error fetching vehicle');
        }
        return response.json()
    })
    .catch(error => console.log(error))
}

export const postFinishedService = async (recommendedServices, note, vehicleId, currentServiceId) => {
    //obter lista de serviços recomendados de veículo
    const dataConclusao = new Date().toISOString();
    return fetch(baseUrl + `vehicles/${vehicleId}`)
    //atualizar coluna de serviços
    .then( resposta => resposta.json())
    .then(dados => {
        const antigosRecomendados = dados.recomendados || []
        const recomendadosSemRepetidos = [...(new Set(antigosRecomendados.concat(recommendedServices)))]
        return fetch(baseUrl + `vehicles/${vehicleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "recomendados": recomendadosSemRepetidos,
            }),
        });
    })
    .then (vehicleUpdateResponse => {
        return fetch (baseUrl + `services/${currentServiceId}`, {
            method : 'PATCH',
            headers : {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "estado": "realizado",
                "notas-concluido": note,
                "data-conclusao": dataConclusao,
            })
        }) .then( serviceUpdateResponse => {
            return vehicleUpdateResponse.ok && serviceUpdateResponse.ok
        })
    })
    .then (sucess => {return sucess})
    .catch (error => console.error('Error posting finished service:', error))
}

export const postSuspendedService = async (reason, currentServiceId) => {

    //atualizar coluna de serviços
    return fetch (baseUrl + `services/${currentServiceId}`, {
        method : 'PATCH',
        headers : {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "estado": "parado",
            "razao-suspensao": reason,
        })
    })
    .then(response => {
        if (response.ok) {
            return true
        } else {
            return false
        }
    })
    .catch (error => console.error('Error posting suspended service:', error));
}

export const postStartedService = async (serviceId) => {

    return fetch (baseUrl + `services/${serviceId}`, {
        method: 'PATCH' ,
        headers: { 'Content-Type' :  'application/json'},

        body: JSON.stringify( {
            "estado": "adecorrer" 
        })
    })
    .then(response => {
        if (response.ok) {
            return true
        }

        return false
    })
    .catch(error => console.error('Error posting started service: ', error));
}