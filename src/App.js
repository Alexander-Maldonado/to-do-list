import './App.css';
import React, {useState} from 'react';

function App() {
  const [newTodo, setNewToDO] = useState('');
  const [todos, setTodos]= useState([]);

  const submitList=(event)=>{
    event.preventDefault();
    if(newTodo.length===0){
      return;
    }

    const itemComp={
      text: newTodo,
      complete:false
    }
    console.log(newTodo);
    setTodos([...todos, itemComp]);
    setNewToDO('');
  };

  const remove = (delIndex)=>{
    const refreshTodos = todos.filter((todo, i)=>{
      return i !== delIndex;
    });
    setTodos(refreshTodos);
  }

  const completedToDO=(index)=>{
    const updatedToDo = todos.map((todo, i)=>{
      if (index === i){
        const updatedToDo = {...todo, complete: !todo.complete};
        return updatedToDo;
      }
      return todo;
    });

    setTodos(updatedToDo);
  }

  return (
    <div className="App">
      <form onSubmit={(event)=>{
        submitList(event);
      }}>
        <input onChange={(event)=>{
          setNewToDO(event.target.value)
        }} type='text' value={newTodo}></input>
        <button>Add</button>
      </form>
      <hr/>
      <div>
        {
          todos.map((todo, i)=>{
            const styling=[];
            if (todo.complete){
              styling.push('line-through');
            }
            return(
              <ul key={i}>
                <li>
                  <span className={styling.join('')}>{todo.text} </span>
                  <input onChange={(event)=>{
                    completedToDO(i);
                  }} checked={todo.complete} type='checkbox'/>
                  <button onClick={(event)=>{
                    remove(i);
                  }}>Delete</button>
                </li>
              </ul>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
