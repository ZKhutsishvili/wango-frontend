import React, { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { backendAxiosClient } from "../../utilities/apiClients"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { logOut } from "../../utilities/sharedFunctions"

const LoginPage = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['name']);
        
    const updateData = (value, item) => {
        setData(state => { return {...state, [item]: value}})
    }

    const handleValidation = () => {
        return true
    }

    const handleLogin = () => {
        if (handleValidation) {
            backendAxiosClient.post("api/auth/login", data).then(res => {
                if (res.data) {
                    setCookie("token", res.data.access_token)
                    navigate("/home")
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
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <div className='d-flex justify-content-center align-items-center'> 
                                <Label>
                                    Login
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
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={e => updateData(e.target.value, `password`)}
                                className="mt-3"
                                type="password"
                            />
                        </FormGroup>
                        <Row className='justify-content-center'>
                            <Button className="w-fit-content p-2 m-2" color="dark"  onClick={handleLogin}>Login</Button>
                            <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => navigate("/register")}>Register</Button>
                        </Row>
                        </Form>
                        <br />
                    </Col>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default LoginPage