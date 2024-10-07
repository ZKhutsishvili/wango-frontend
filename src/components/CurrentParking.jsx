import React, { useEffect, useState } from "react"
import { Button, Col, Row } from "reactstrap"
import Select from 'react-select'
import { startParking, stopParking } from "../pages/parking/apiCalls"

const CurrentParking = (props) => {
    const {setParkingHistory, cities, lastParking} = props
    const [currentParkingStarted, setCurrentParkingStarted] = useState(false)
    const [currentParking, setCurrentParking] = useState()
    const [city, setCity] = useState()
    const [area, setArea] = useState()
    const [parkingAreaOptions, setParkingAreaOptions] = useState([])
    const cityOptions = cities.map(elem => { return {id: elem.id, value: elem, label: elem.name} })
    useEffect(() => {
        if (city?.parkingAreas) {
            setParkingAreaOptions(city.parkingAreas.map(elem => { return {id: elem.id, value: elem, label: elem.name} }))
            setArea(undefined)
        } else {
            setParkingAreaOptions([])
        }
    }, [city])

    useEffect(() => {
        if (lastParking?.id && !lastParking.endTime) {
            setCity(lastParking.parkingArea.city)
            setArea(lastParking.parkingArea)
            setCurrentParkingStarted(true)
            setCurrentParking(lastParking)
        }
    }, [lastParking])
    return (
        <div className={`d-flex justify-content-center w-100`}>
            <Row className="w-50 m-3 p-0">
                <Col>
                    <Select
                        theme='light'
                        className=""
                        classNamePrefix='select'
                        placeholder="Choose city"
                        options={cityOptions}
                        value={city?.id ? cityOptions.find(elem => elem.id === city.id) : {}}
                        onChange={e => setCity(e.value)}
                        isClearable={false}
                        isDisabled={currentParkingStarted}
                    />
                </Col>
                <Col>
                    <Select
                        theme='light'
                        className=""
                        classNamePrefix='select'
                        placeholder="Choose parking area"
                        options={parkingAreaOptions}
                        value={area?.id ? parkingAreaOptions.find(elem => elem.id === area.id) : {}}
                        onChange={e => setArea(e.value)}
                        isClearable={false}
                        isDisabled={currentParkingStarted}
                    />
                </Col>
            </Row>
            <span className="m-2">
                {currentParkingStarted ? 
                    <Button className="p-2 m-2" color="dark"  onClick={() => {
                        stopParking(currentParking.id, {endTime: new Date()}, (data) => {
                            setCurrentParkingStarted(!currentParkingStarted)
                            setParkingHistory(prevState => [...prevState, data])
                            setCity()
                            setArea()
                        }) 
                    }}>Stop parking</Button>
                    :
                    <Button className="p-2 m-2" color="dark" disabled={!area} onClick={() => {
                        startParking({parkingAreaId: area.id, startTime: new Date()}, (data) => {
                            setCurrentParkingStarted(!currentParkingStarted)
                            setCurrentParking(data)
                        }) 
                    }}>Start parking</Button>
                }
            </span>
        </div>
    )
}

export default CurrentParking