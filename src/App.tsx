import { type } from "os";
import React, { useState } from "react";
import "./style.css";
import Inputfield from "./components/Inputfield";
import { todo } from "./components/models";
const App: React.FC = () => {
  const [formData, setformData] = useState<string>(() => "");
  const [todos, setTodos] = useState<todo[]>([]);

  function handleclick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todos) {
      setTodos((oldval) => [
        ...oldval,
        { id: Date.now(), todo: formData, isCompleted: false },
      ]);
    } else {
      setTodos([{ id: Date.now(), todo: formData, isCompleted: false }]);
    }
    setformData('')
    console.log("button was clicked");
  }
  const myTodos = todos.map((todo) => {
    return (
      <div key={todo.id}>
        <p>{todo.todo}</p>
      </div>
    );
  });
  return (
    <div className="App">
      <h1 className="heading">Tasky</h1>
      <h1>{formData}</h1>
      {myTodos}
      <Inputfield
        todo={formData}
        setTodo={setformData}
        handleclick={handleclick}
      />
    </div>
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
