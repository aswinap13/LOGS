import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Student from './components/students/Student';
import Teach from './components/teachers/Teach';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
          <Route exact path='/loginx' element={<Login />}></Route>
          <Route exact path='/student' element={<Student />}></Route>
          <Route exact path='/Staff' element={<Teach />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
