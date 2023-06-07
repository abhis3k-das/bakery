import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Items from './pages/Items/Items';
import MainOutlet from './utils/MainOutlet';
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainOutlet />}>
        <Route path='home' element={<Home />}></Route>
        <Route path='items' element={<Items/>}></Route>
      </Route>
    </Routes>
  )
}

export default App;
