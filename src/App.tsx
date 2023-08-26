import { useEffect } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import { getPokemons } from './service/pokeapi'
function App() {
  useEffect(() => {
    getPokemons(10000,0)
  }, [])
  
  return (
   <LoginPage/>
  )
}

export default App
