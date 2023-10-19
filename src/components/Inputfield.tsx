import React from 'react'


interface Props {
    todo: string,
    setTodo:  React.Dispatch<React.SetStateAction<string>>
}
const Inputfield: React.FC<Props> = ({todo, setTodo}) => {
    function handleclick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault()
        
    }
    function handlechange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        setTodo(()=> event.target.value)
    }
  return (
    <div className='input_field'>
        <form className='input_form'>
            <input type='text' name='tast' placeholder='Enter Task' value={todo} className='field' onChange={(event)=> handlechange(event)} />
            <button type='submit' name='submit' className='submit' onClick={(event)=>handleclick(event)}>GO</button>
        </form>
    </div>
  )
}

export default Inputfield