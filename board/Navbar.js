// @flow

import React from 'react'
import styled from 'styled-components'
import {
  Navbar as BSNavbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

export default function Navbar({transparent}) {
  const backgroundColor = transparent ? 'rgba(0,0,0,.35)' : '#026aa7'

  return (
    <BSNavbar dark expand="md" style={{height: '40px', backgroundColor, color: 'white'}}>
      <NavbarButton>
        <NavbarButtonIcon>H</NavbarButtonIcon>
      </NavbarButton>
      <NavbarButton>
        <NavbarButtonIcon className="px-3">Boards</NavbarButtonIcon>
      </NavbarButton>

      <div className="ml-auto d-flex justify-content-center align-items-center">
        <NavbarButton>
          <NavbarButtonIcon>P</NavbarButtonIcon>
        </NavbarButton>
        <NavbarButton>
          <NavbarButtonIcon>I</NavbarButtonIcon>
        </NavbarButton>
        <NavbarButton>
          <NavbarButtonIcon>B</NavbarButtonIcon>
        </NavbarButton>
        <UncontrolledDropdown inNavbar size="sm">
          <CircleAvatar>SU</CircleAvatar>

          <DropdownMenu right>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </BSNavbar>
  )
}

const NavbarButton = styled.div`
  transition: 0.1s ease;
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 3px;
  color: #fff;
  display: block;

  font-weight: 700;
  line-height: 32px;
  margin-right: 4px;
  min-width: 32px;
  padding: 0;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

const NavbarButtonIcon = styled.span`
  min-height: 32px;
  font-size: 16px;
  line-height: 32px;
  min-width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CircleAvatar = styled(DropdownToggle)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25rem !important;
  background-color: #dfe3e6;
  color: #17394d;
  cursor: pointer;
  height: 32px;
  overflow: visible;
  position: relative;
  width: 32px;
  text-decoration: none;
  user-select: none;
  z-index: 0;
`
