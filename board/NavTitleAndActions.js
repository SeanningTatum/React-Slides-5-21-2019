import React from 'react'
import {Nav, NavbarBrand, Button, Container} from 'reactstrap'

export default function NavTitleAndActions() {
  return (
    <Nav
      dark
      expand="md"
      style={{height: '40px', backgroundColor: 'rgba(0, 0, 0, 0.25)', color: 'white'}}
    >
      <Container fluid className="d-flex flex-row align-items-center">
        <NavbarBrand className="mr-5">Board Title</NavbarBrand>
        <p className="mb-0 mr-3">Personal</p>
        <p className="mb-0 mr-3">Private</p>
        <p className="mb-0 mr-3">Members Stacked</p>
        <Button size="sm">Share</Button>
      </Container>
    </Nav>
  )
}
