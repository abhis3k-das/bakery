import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Test from './pages/Test';
import MainOutlet from './utils/MainOutlet';
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainOutlet />}>
        <Route path='home' element={<Home />}></Route>
        <Route path='test' element={<Test />}></Route>
      </Route>
    </Routes>
  )
}

export default App;
