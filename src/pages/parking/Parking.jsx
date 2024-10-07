import React, { useEffect, useState } from "react"
import CurrentParking from "../../components/CurrentParking"
import ParkingHistory from "../../components/ParkingHistory"
import { getParkingHistory } from "./apiCalls"
import { backendAxiosClient } from "../../utilities/apiClients"

const Parking = () => {
    const [parkingHistory, setParkingHistory] = useState([])
    const [cities, setCities] = useState([])
    useEffect(() => {
        getParkingHistory(setParkingHistory)
        backendAxiosClient.get("api/parking/cities").then(res => {
            if (res.data) {
                setCities(res.data)
            }
        })
    }, [])
    return (
        <div className='w-100 h-100 d-flex flex-column'> 
            <CurrentParking setParkingHistory={setParkingHistory} cities={cities} lastParking={parkingHistory && parkingHistory.find(elem => elem.endTime === null)}/>
            <ParkingHistory parkingHistory={parkingHistory}/>
        </div>
    )
}

export default Parking