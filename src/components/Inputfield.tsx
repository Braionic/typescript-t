import React, { useRef } from 'react'
interface Props {
    todo: string,
    setTodo:  React.Dispatch<React.SetStateAction<string>>,
    handleclick: (e: React.FormEvent<HTMLFormElement>)=>void
}
const Inputfield: React.FC<Props> = ({todo, setTodo, handleclick}) => {
    const inputref = useRef<HTMLInputElement>(null);
    function handlechange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        setTodo(()=> event.target.value)
        
    }
  return (
    <div className='input_field'>
        <form className='input_form' onSubmit={(e)=> {
            handleclick(e)
            inputref.current?.blur()
            }}  >
            <input type='text' ref={inputref} name='tast' placeholder='Enter Task' value={todo} className='field' onChange={(event)=> handlechange(event)} required/>
            <button type='submit' name='submit' className='submit'>GO</button>
        </form>
    </div>
  )
}

export default Inputfield