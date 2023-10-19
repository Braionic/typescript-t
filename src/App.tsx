import { type } from 'os';
import React from 'react';

function App() {
  type namee = string;
  type userage = number;
  type person = {
    name: String,
    age: number,
    lastName?: string
  }

  const Person: person = {
    name: "henry",
    age: 31
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
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
