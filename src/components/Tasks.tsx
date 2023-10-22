import React from 'react'
import { todo } from './models'
import { FaPencilAlt, FaRegTrashAlt, FaTimes, FaRegThumbsUp, FaCheck } from 'react-icons/fa';
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
   
    const mytodos = todos.map((todo)=>{
            return (
                <form className='task-item'style={{backgroundColor: todo.isCompleted?'green': 'red', color: 'white'}}>
                {!todo.isediting?<p className='class-text'>{todo.todo}</p>: <input value={editedText?editedText: todo.todo} onChange={(event)=> setEditedText(event.target.value)} />}
                <div className='icons'>
                        <button className='edit-button' onClick={(event)=>{handleEditToggle(event, todo.id)}} disabled={todo.isCompleted}>{!todo.isediting?<FaPencilAlt />: <FaCheck />}</button>
                        <button className='delete-button' onClick={(event)=>handledelete(event, todo.id)}><FaRegTrashAlt /></button>
                        <button className='toggle-task' onClick={(event)=> handletoggle(event, todo.id)}>{todo.isCompleted?<FaRegThumbsUp />: <FaRegThumbsUp />}</button>
                    </div>
                </form>
            )
    })
  return (
    <div className="tasks">
        {mytodos}
    </div>
  )
}

export default Tasks