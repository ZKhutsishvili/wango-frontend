import { Row, Col } from "reactstrap"
import React, { useEffect } from "react"
import TopbarNavigationItem from "./TopbarNavigationItem"
import { useCookies } from "react-cookie"
import { useLocation, useNavigate } from "react-router-dom"

const Topbar = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token && (!location.pathname.includes("login") && !location.pathname.includes("register"))) {
      //navigate("/login")
    }
  }, [cookies, location, navigate])
  return (<div className="row m-0 p-0">
      <Col className="col-1 m-0 p-0">
        <Row className='m-0 vh-5 bg-dark text-white d-flex'>
          <TopbarNavigationItem label="Wango" url="/" customClass="col-12"/>
        </Row>
      </Col>
      <Col className="col-11 m-0 p-0">
      <Row className='m-0 vh-5 bg-dark text-white d-flex'>
        <div className="d-flex w-fit-content m-0 p-0 flex-row-reverse">
            <TopbarNavigationItem label="Register" url="/register"/>
            <TopbarNavigationItem label="Login" url="/login"/>
            <TopbarNavigationItem label="Parking" url="/parking"/>
        </div>
      </Row>
      </Col>
  </div>
  )
}

export default Topbar
