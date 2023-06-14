import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Items from './pages/Items/Items';
import MainOutlet from './utils/MainOutlet';
import HeaderOutlet from './utils/HeaderOutlet';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
function App() {
  return (
    <Routes>
      <Route path='/' element={<MainOutlet />}>
        <Route path='home' element={<Home />}></Route>
        <Route path='bakery' element={<HeaderOutlet/>}>
          <Route path='items' element={<Items/>}></Route>
          <Route path='about' element={<About/>}/>
          <Route path='cart' element={<h1>Hello</h1>}/>
          <Route path='blog' element={<Blog/>}/>
          <Route path='login' element={<h1>Login/signup</h1>}></Route>
          <Route path='signup' element={<h1>Login/signup</h1>}></Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
