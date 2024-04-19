const baseUrl = 'http://localhost:3000/';

// Funções de fetch básicas
export const fetchServicesToComplete = async () => {
    return fetch(baseUrl + "services?estado_ne=realizado") // devolve todos os serviços com estado não igual (ne) a "realizado"
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
    return fetch(baseUrl + `services?=vehicleId=${vehicleId}`) // devolve todos os serviços com estado não igual (ne) a "realizado"
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

export const postFinishedService = async (recommendedServices, note, vehicleId, currentServiceId) => {
    //obter lista de serviços recomendados de veículo
    fetch(`http://localhost:3000/vehicles/${vehicleId}?_fields=recomendados`)
    //atualizar coluna de serviços
    .then( resposta => resposta.json())
    .then(dados => {
        console.log(dados)
        const antigosRecomendados = dados.recomendados || []
        console.log(antigosRecomendados)

        const recomendadosSemRepetidos = [...(new Set(antigosRecomendados.concat(recommendedServices)))]
        return fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "recomendados": recomendadosSemRepetidos,
            }),
        });
    })
    .then (result => {
        const res =
        fetch (`http://localhost:3000/services/${currentServiceId}`, {
            method : 'PATCH',
            headers : {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                "estado": "realizado",
                "notas-concluido": note,
            })
        })
        return result.ok && res.ok
    })
    .then( response => {
        if (response) {
            return true
        } else {
            return false
        }
    })
    .catch (error => console.error('Error posting finished service:', error))
}

export const postSuspendedService = async (reason, currentServiceId) => {

    //atualizar coluna de serviços
    fetch (`http://localhost:3000/services/${currentServiceId}`, {
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
