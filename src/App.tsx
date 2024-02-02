import AddToDo from './components/addtodo';
import Todos from './components/Todos';
import Navbar from './components/navbar';
import './App.css'

const App = () => {
  return (<>
    <h1>TODO WITH REACT + TYPESCRIPT</h1>
    <Navbar />
    <AddToDo />
    <Todos />
  </>
  )
}

export default App;