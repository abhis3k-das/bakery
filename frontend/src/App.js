import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Items from './pages/Items/Items';
import MainOutlet from './utils/MainOutlet';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
import Cart from './pages/Cart/Cart';
import { StoreProvider } from './Context/store-context';
import Login from './pages/LoginSignUp/Login';
import SignUp from './pages/LoginSignUp/SignUp';
import {UserContextProvider} from './Context/user-context'
import AddItem from './pages/AddNewProduct/AddItem';
import AuthOutlet from './utils/AuthOutlet';
import Orders from './pages/Orders/Order';
function App() {
  return (
    <UserContextProvider>
      <StoreProvider>
        <Routes>
          <Route path='/' element={<MainOutlet />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='login' element={<Login/>}></Route>
              <Route path='signup' element={<SignUp/>}></Route>
              <Route path='items' element={<Items/>}></Route>
              <Route path='blog' element={<Blog/>}/>
              <Route path='about' element={<About/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='admin' element={<AuthOutlet/>}>
                <Route path="addItem" element={<AddItem/>}></Route>
              </Route>
          </Route>
        </Routes>
      </StoreProvider>
    </UserContextProvider>
  )
}

export default App;
