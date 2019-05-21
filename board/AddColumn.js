// @flow

import React from 'react'
import {Input, Button} from 'reactstrap'
import styled from 'styled-components'

import useFormInput from './useFormInput'


export default function AddColumn(props) {
  const {setValue: setColumnValue, ...columnInput} = useFormInput('')

  function onAddListClicked() {
    props.onAddColumn(columnInput.value)
    setColumnValue('')
  }

  return (
    <Container addingColumn={props.addingColumn}>
      {!props.addingColumn ? (
        <AddColumnPlaceholder onClick={props.onAddListClicked}>
          + Add another list
        </AddColumnPlaceholder>
      ) : (
        <>
          <Input placeholder="Enter list title..." {...columnInput} />
          <div className="mt-2">
            <Button color="success" size="sm" onClick={onAddListClicked}>
              Add List
            </Button>
          </div>
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  border-radius: 3px;
  height: auto;
  min-height: 32px;
  padding: 4px 8px;
  background-color: ${props => (props.addingColumn ? '#dfe3e6' : 'rgba(0, 0, 0, 0.24)')};
  cursor: pointer;
  color: #fff;
  height: fit-content;
  min-width: 250px;
`

const AddColumnPlaceholder = styled.span`
  padding: 6px 8px;
  min-height: 32px;
`
