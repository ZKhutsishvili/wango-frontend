import React from "react"
import { Col, Row } from "reactstrap"

const ParkingHistory = (props) => {
    const {parkingHistory} = props
    return (
        <div className={`d-flex justify-content-center flex-direction-col w-100`}>
            <Col className="m-2 p-2">
            {parkingHistory?.map(elem => {
                return <Row className="w-100 m-3 p-0 parking-row">
                    <Col>
                        City: {elem.parkingArea?.city?.name}
                    </Col>
                    <Col>
                        Parking area: {elem.parkingArea?.name}
                    </Col>
                    <Col>
                        From: {elem.startTime}
                    </Col>
                    <Col>
                        To: {elem.endTime}
                    </Col>
                    <Col>
                        Price: {elem.finalPrice}
                    </Col>
                </Row>
            })}
            </Col>
        </div>
    )
}

export default ParkingHistory