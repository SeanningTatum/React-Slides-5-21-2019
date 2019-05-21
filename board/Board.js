import React, {useState} from 'react'
import {Container} from 'reactstrap'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import {DropResult, DragDropContext, Droppable} from 'react-beautiful-dnd'

import Navbar from './Navbar'
import NavTitleAndActions from './NavTitleAndActions'
import Column from './Column'
import AddColumn from './AddColumn'

import './index.css'

const sampleBoardData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Take out the garbage'},
    'task-2': {id: 'task-2', content: 'Send this to turings'},
    'task-3': {id: 'task-3', content: 'Create nodejs backend'},
    'task-4': {id: 'task-4', content: 'Create GraphQL with Prisma Backend'},
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Todo',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Another todo',
      taskIds: ['task-3', 'task-4'],
    },
  },

  columnOrder: ['column-1', 'column-2'],
}

export default function Board() {
  const [board, setBoard] = useState(sampleBoardData)
  const [addCardId, setAddCardId] = useState()
  const [addingColumn, setAddingColumn] = useState(false)

  /**
   * Helper function that reorders array elements
   */
  function reorder(array, startIndex, endIndex) {
    const result = Array.from(array)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  /**
   * Helper function that moves one task card to another list
   */
  function move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = [...source]
    const destClone = [...destination]

    // Remove item
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    // Add the removed item to the destination
    destClone.splice(droppableDestination.index, 0, removed)

    // Return the updated columns
    const newColumns = {...board.columns}
    newColumns[droppableSource.droppableId].taskIds = sourceClone
    newColumns[droppableDestination.droppableId].taskIds = destClone

    return newColumns
  }

  /**
   * Function that handles all drag related stuff
   * eg. moving columns / cards around
   */
  function onDragEnd(result) {
    const {destination, source, type} = result

    // dropped outside the list
    if (!destination) {
      return
    }

    const newBoard = {...board}

    /**
     * Handle arrangement for columns
     */
    if (type === 'column') {
      const newColumnOrder = reorder(board.columnOrder, source.index, destination.index)

      newBoard.columnOrder = newColumnOrder
      setBoard(newBoard)
      return
    }

    /**
     * Handle arrangement of tasks
     */

    // If user put dropped the task on the same list
    if (destination.droppableId === source.droppableId) {
      // Update the arrangement of the tasks ids
      const newTaskIds = reorder(
        newBoard.columns[destination.droppableId].taskIds,
        source.index,
        destination.index
      )

      // Update specific column with arrangement of the task ids
      newBoard.columns[source.droppableId] = {
        ...newBoard.columns[source.droppableId],
        taskIds: newTaskIds,
      }
    } else {
      // User dropped task on another list

      // Move task from one column to another
      const newColumns = move(
        board.columns[source.droppableId].taskIds,
        board.columns[destination.droppableId].taskIds,
        source,
        destination
      )

      // Update newBoard columns with the rearranged tasks
      newBoard.columns = newColumns
    }

    setBoard(newBoard)
  }

  /**
   * Function that adds a task any column
   */
  function onAddTask(taskContent, columnId) {
    setAddCardId('')

    const newBoard = {...board}
    const newId = new Date().toString()

    const newTasks = {...newBoard.tasks}
    const newColumn = {...newBoard.columns[columnId]}

    // Create new task object
    newTasks[newId] = {id: newId, content: taskContent}
    // Add taskId to taskId array
    newColumn.taskIds = [...newColumn.taskIds, newId]

    // Update board with the new taskId and new task
    newBoard.tasks = newTasks
    newBoard.columns = {...newBoard.columns, [columnId]: newColumn}

    setBoard(newBoard)
  }

  /**
   * Function that adds a column to the end of
   * the column object
   */
  function onAddColumn(columnName) {
    setAddingColumn(false)
    const newBoard = {...board}

    const columnId = new Date().toString()

    const newColumns = {...newBoard.columns}

    // Create new column
    newColumns[columnId] = {id: columnId, title: columnName, taskIds: []}

    newBoard.columns = newColumns
    newBoard.columnOrder = [...newBoard.columnOrder, columnId]

    setBoard(newBoard)
  }

  return (
    <AppContainer>
      <Navbar transparent />
      <NavTitleAndActions />
      <Container fluid className="pt-4" style={{flex: 1}}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <BoardContainer {...provided.droppableProps} ref={provided.innerRef}>
                {board.columnOrder.map((columnId, ndx) => {
                  const column = board.columns[columnId]
                  const tasks = column.taskIds.map(taskId => board.tasks[taskId])

                  return (
                    <Column
                      tasks={tasks}
                      column={column}
                      key={columnId}
                      ndx={ndx}
                      onAddCardPressed={() => setAddCardId(columnId)}
                      isAddCardActive={addCardId === columnId}
                      addTask={onAddTask}
                    />
                  )
                })}

                {provided.placeholder}

                <AddColumn
                  addingColumn={addingColumn}
                  onAddListClicked={() => setAddingColumn(true)}
                  onAddColumn={onAddColumn}
                />
              </BoardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #026aa7;
  font-size: 16px;
  text-align: start;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
`

const BoardContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: transparent;
  height: 100%;
`
