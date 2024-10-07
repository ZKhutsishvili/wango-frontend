import React, { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { backendAxiosClient } from "../../utilities/apiClients"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { logOut } from "../../utilities/sharedFunctions"

const RegisterPage = () => {
    const [data, setData] = useState({})
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['name']);
          
    const updateData = (value, item) => {
        setData(state => { return {...state, [item]: value}})
    }

    const handleValidation = () => {
        return true
    }

    const handleRegister = () => {
        if (handleValidation) {
            backendAxiosClient.post("api/auth/register", data).then(res => {
                if (res.data) {
                    setSuccess(true)
                }
            }).catch((res) => console.error(res))
        }
    }

    useEffect(() => {
        logOut()
    }, [])

    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'> 
            <Modal 
                isOpen={true}
                className='modal-dialog-centered'
            > 
                <ModalBody className="d-flex justify-content-center">
                    <Col>
                    <Form onSubmit={handleRegister}>
                        <FormGroup>
                            <div className='d-flex justify-content-center align-items-center'> 
                                <Label>
                                    Register
                                </Label>
                            </div>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={e => updateData(e.target.value, `email`)}
                                className="mt-3"
                            />
                            <Input
                                id="name"
                                name="name"
                                placeholder="Name"
                                onChange={e => updateData(e.target.value, `name`)}
                                className="mt-3"
                            />
                            <Input
                                id="carPlateNumber"
                                name="carPlateNumber"
                                placeholder="Plate Number"
                                onChange={e => updateData(e.target.value, `carPlateNumber`)}
                                className="mt-3"
                            />
                            <Input
                                id="address"
                                name="address"
                                placeholder="Address"
                                onChange={e => updateData(e.target.value, `address`)}
                                className="mt-3"
                            />
                            <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={e => updateData(e.target.value, `password`)}
                                className="mt-3"
                                type="password"
                            />
                            <Input
                                id="repeatPassword"
                                name="repeatPassword"
                                placeholder="Repeat Password"
                                onChange={e => updateData(e.target.value, `repeatPassword`)}
                                className="mt-3"
                                type="password"
                            />
                        </FormGroup>
                        {success &&
                        <Row>
                            <Label className='d-flex justify-content-center text-success'>Registered successfully!</Label>
                        </Row>
                        }
                        <Row className='justify-content-center'>
                            {!success && <Button className="w-fit-content p-2 m-2" color="dark"  onClick={handleRegister}>Register</Button>}
                            <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => navigate("/login")}>Login</Button>
                        </Row>
                        </Form>
                        <br />
                    </Col>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterPage