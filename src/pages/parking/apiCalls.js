import { backendAxiosClient } from "../../utilities/apiClients"

export const getParkingHistory = (action) => {
    backendAxiosClient.get("api/parking").then(res => {
        if (res.data) {
            action(res.data)
            return res.data
        } else {
            return []
        }
    }).catch(() => {
        return []
    })
}

export const startParking = (payload, action) => {
    backendAxiosClient.post("api/parking", payload).then(res => {
        if (res.data) {
            action(res.data)
            return res.data
        } else {
            return []
        }
    }).catch(() => {
        return []
    })
}

export const stopParking = (id, payload, action) => {
    backendAxiosClient.put(`api/parking/${id}`, payload).then(res => {
        if (res.data) {
            action(res.data)
            return res.data
        } else {
            return []
        }
    }).catch(() => {
        return []
    })
}