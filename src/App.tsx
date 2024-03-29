import { type } from "os";
import React, { useState } from "react";
import "./style.css";
import Inputfield from "./components/Inputfield";
import { todo } from "./components/models";
import Tasks from "./components/Tasks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [formData, setformData] = useState<string>(() => "");
  const [todos, setTodos] = useState<todo[]>([]);
  const [editedText, setEditedText] = useState<string>("")
  const [completedTodos, setCompletedTodos] = useState<todo[]>([])

  function handleclick(event: React.FormEvent<HTMLFormElement>) {
    
    event.preventDefault(); //prevent reload when the handle click button is clicked
    //set todo task when new task is filled in and submitted
    if (todos) {
      setTodos((oldval) => [
        ...oldval,
        { id: Date.now(), todo: formData, isCompleted: false, isediting: false },
      ]);
    } else {
      setTodos([{ id: Date.now(), todo: formData, isCompleted: false, isediting: false }]);
    }
    
    setformData('') //refresh form data
    console.log("button was clicked");
  }
  //map out todo tasks
  const myTodos = todos.map((todo) => {
    return (
      <div key={todo.id}>
        <p>{todo.todo}</p>
      </div>
    );
  });
//handle delete task
  function handledelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: number){
    event.preventDefault()
    console.log(todo)
    setTodos((oldval)=>{
      return oldval.filter((val)=>{
        return val.id !== todo
      })
    })
  }
//handle task completion toggle
  function handletoggle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: number){
      event.preventDefault()
      console.log(todo)
      setTodos((oldval)=> {
        return oldval.map((val)=>{
          return val.id === todo? {...val, isCompleted: !val.isCompleted}: val
        })
      })
  }
  //activtes edit form if edit button is clicked
  function handleEditToggle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: number){
    event.preventDefault()
    setTodos((oldval)=>{
      return oldval.map((val)=>{
        //show form field for the item clicked
        return val.id === todo? {...val, isediting: !val.isediting}: val
      })
    })
    //if texts are found in edited text, update todos with new edited text from that user
    if(editedText){
      setTodos((oldval)=>{
        return oldval.map((val)=>{
          return val.id === todo? {...val, todo: editedText}: val
        })
      })
      setEditedText("")
    }

    
    
}
function handleDrag(result: DropResult){
  console.log(result)
  const {source, destination} = result;
  let active = todos;
  let complete = completedTodos;
  let additem;
  if(!destination) return;
  if(destination.droppableId === source.droppableId &&
       destination.index === source.index) 
       return;
  if(source.droppableId === "todos"){
      additem = active[source.index]
      active.splice(source.index, 1)
  }else{
      additem = complete[destination.index]
      complete?.splice(destination.index, 1)
  }
  
  if(destination.droppableId === "todos"){
      active.splice(destination.index, 0, additem)
      
  }else{
      complete?.splice(destination.index, 0, additem)
      
  }
 
  setCompletedTodos(complete)
  setTodos(active)
  
}
  return (
    <DragDropContext onDragEnd={handleDrag}>
    <div className="App">
      <h1 className="heading">Tasky</h1>
      <h1>{formData}</h1>
      {myTodos}
      <Inputfield
        todo={formData}
        setTodo={setformData}
        handleclick={handleclick}
      />
      
      <Tasks 
      setTodos={setTodos} 
      handleEditToggle={handleEditToggle} 
      todos={todos} 
      handledelete={handledelete} 
      handletoggle={handletoggle} 
      setEditedText={setEditedText}
      editedText={editedText}
      completedTodos={completedTodos}
      setCompletedTodos={setCompletedTodos}
      />
      
    </div>
    </DragDropContext>
  );
};

export default App;

/*
  type namee = string;
  type userage = number;

  interface x {
    gender?: string,
    nationality?: string
  }

  interface person extends x {
    name: String,
    age: number,
    lastName?: string
  }

  type g = {
    gender?: string,
    nationality?: string
  }

  type y = g & {
    name: String,
    age: number,
    lastName?: string
  }
 
  const Person: person = {
    name: "henry",
    age: 31,
    gender: "Male"
  }

  
  const man: {name: string, age: number} = {
    name: "Rowland",
    age: 32
  }

  function myf(name: string = "Steve", age: number = 50){
    return `my name is ${name} and i am ${age} years old`
  }
  type men = string[];
  let guys: men = ["ben, james"];

  type women = [string, number];
  let girls: women = ["mary", 19]
  console.log(girls)
  console.log(guys)
  console.log(myf("Bob", 40))
  console.log(man)
  Person.lastName = "john";
  console.log(Person)
  let age: userage = 23;
  console.log(age)

  let name: namee = "man";
  name = "woman";
  console.log(name)
  */
