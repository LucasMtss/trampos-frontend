import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/CreateUser';
import FindByFilters from './pages/findByFilters';
import Login from './pages/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cadastro" element={<CreateUser/>}/>
        <Route path="/usuario/:id" element={<CreateUser/>}/>
        <Route path="/busca" element={<FindByFilters/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
