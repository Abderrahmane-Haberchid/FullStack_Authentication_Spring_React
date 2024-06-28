
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './auth/PrivateRoute';
import AddBook from './pages/AddBook';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';

function App() {

  const token = localStorage.getItem("token")
  return (
    
    <Router>
      <Routes>
        <Route path='/home' element={
              <PrivateRoute token={token} element={<Home />} />
} 
        />
        <Route path='/' element={
              <PrivateRoute token={token} element={<Home />}/>} 
        />
        <Route path='/add_book' element={
              <PrivateRoute token={token} element={<AddBook />}/>} 
        />
        <Route path='/all_books' element={
              <PrivateRoute token={token} element={<Books />}/>} 
        />
        <Route path='/my_books' element={
              <PrivateRoute token={token} element={<MyBooks />}/>} 
        />
        <Route path='/logout' element={
              <PrivateRoute token={token} element={<SignIn />}/>} 
        />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
    </Router>
      
    
  );
}

export default App;
