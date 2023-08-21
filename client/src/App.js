import{ useState, useEffect} from 'react' ;

const API_BASE = "http://localhost:3050"

function App() {
  const [todos , setTodos] = useState([]);
  const[popupActive, setPopupActive] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() =>{
    GetTodos()

    console.log(todos);
  },[]) 

  const GetTodos = () =>{
    fetch(API_BASE + '/todos' ).then( res=> res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: ", err))
  }
//{"todo" + (todo.complete ? "is-complete" : "" )}

const completeTodo = async id =>{
  const data = await fetch(API_BASE + "/todos/complete/" + id, {method: 'PUT'} )
  .then(res =>res.json())

  setTodos(todos => todos.map(todo => {
    if(todo._id === data._id){
      todo.complete = data.complete
    }

    return todo
  }))
}

  return (
    <div className="App">
     <h1> Welcome User</h1>
     <h4> Your Tasks</h4>
     <div className ="todos"> 
     

    {todos.map(todo =>
       ( <div className={"todo " + (todo.complete ? "is-complete" : "" )
       }  key={todo._id} onClick={() => completeTodo(todo._id)}>
        <div className = "checkbox"></div>
        <div className="text"> {todo.text}</div>
        <div className ="delete-todo">x</div>
      </div>
      ))}
     
      
   
      
     </div>
    </div>
    
  );
}

export default App;