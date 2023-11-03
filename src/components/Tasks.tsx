import React, { useEffect } from 'react'
import { todo } from './models'
import { FaPencilAlt, FaRegTrashAlt, FaTimes, FaRegThumbsUp, FaCheck } from 'react-icons/fa';
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'
import styled from 'styled-components';



type Props = {
    todos: todo[],
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>,
    handledelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: number)=> void,
    handletoggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number)=> void,
    handleEditToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number)=>void,
    setEditedText:  React.Dispatch<React.SetStateAction<string>>,
    editedText: string
}


const Tasks = ({todos, setEditedText, handledelete, handletoggle, handleEditToggle, editedText}: Props) => {
    const Container = styled.form`
    margin: 10px;
    border: 1px solid black;
  `;

 
    const mytodos = todos.map((todo, index)=>{
        const styled = {
            backgroundColor: todo.isCompleted?'green': 'red',
            Color: 'white'
               }
               
            return (
                <Draggable draggableId={todo.id.toString()} index={index}>
                {(provided)=>(
                    <form {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} className='task-item' style={styled}>
                    {!todo.isediting?<p className='class-text'>{todo.todo}</p>: <input value={editedText?editedText: todo.todo} onChange={(event)=> setEditedText(event.target.value)} />}
                    <div className='icons'>
                            <button className='edit-button' onClick={(event)=>{handleEditToggle(event, todo.id)}} disabled={todo.isCompleted}>{!todo.isediting?<FaPencilAlt />: <FaCheck />}</button>
                            <button className='delete-button' onClick={(event)=>handledelete(event, todo.id)}><FaRegTrashAlt /></button>
                            <button className='toggle-task' onClick={(event)=> handletoggle(event, todo.id)}>{todo.isCompleted?<FaRegThumbsUp />: <FaRegThumbsUp />}</button>
                        </div>
                    </form>
                    
                )
                }
                
                </Draggable>
        
            )
    })
    const completedMytodos = todos.map((todo)=>{
        return (
            
            <form className='task-item' style={{backgroundColor: todo.isCompleted?'green': 'red', color: 'white'}}>
            {!todo.isediting?<p className='class-text'>{todo.todo}</p>: <input value={editedText?editedText: todo.todo} onChange={(event)=> setEditedText(event.target.value)} />}
            <div className='icons'>
                    <button className='edit-button' onClick={(event)=>{handleEditToggle(event, todo.id)}} disabled={todo.isCompleted}>{!todo.isediting?<FaPencilAlt />: <FaCheck />}</button>
                    <button className='delete-button' onClick={(event)=>handledelete(event, todo.id)}><FaRegTrashAlt /></button>
                    <button className='toggle-task' onClick={(event)=> handletoggle(event, todo.id)}>{todo.isCompleted?<FaRegThumbsUp />: <FaRegThumbsUp />}</button>
                </div>
            </form>
           
        )
})
function handleDrag(result: DropResult){
    console.log(result)
}
  return (
    
    <div className="tasks">
        <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId='ROOT'>
            {(provided)=>(
                <div className='droppable-container uncompletedTodo' ref={provided.innerRef} {...provided.droppableProps}>
                <h3>Todos</h3>
            {mytodos}
            </div>
            )}
        </Droppable>
        </DragDropContext>
        <div className='droppable-container completedTodo'>
            <h3>Completed</h3>
        {completedMytodos}
        </div>
        
    </div>
  )
}

export default Tasks