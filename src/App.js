import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/login/Login';
import Navbare from './components/navbar/Navbare';
import Student from './components/students/Student';
import Teach from './components/teachers/Teach';

function App() {
  return (
    <Router>
      <div className="App">
        
      </div>
      <Routes>
          <Route exact path='/' element={<Navbare />}></Route>
          <Route exact path='/Home' element={<Navbare />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/student' element={<Student />}></Route>
          <Route exact path='/Staff' element={<Teach />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
