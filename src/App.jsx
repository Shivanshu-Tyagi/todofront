 
import './App.css'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { TodoProvider } from './context/todoContext'
import AddTodo from './pages/AddTodo'
function App() { 

  return (
    <>
    <TodoProvider>
    <div className='w-full h-screen bg-cyan-950'>
    <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/home' element={<Home />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={<Login />}/>
      <Route path='/addTodo' element={<AddTodo />}/>
     </Routes>
     {/* <Footer/> */}
     </BrowserRouter>
    </div>
    </TodoProvider> 
    </>
  )
}

export default App
