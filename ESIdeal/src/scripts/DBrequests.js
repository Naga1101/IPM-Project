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
