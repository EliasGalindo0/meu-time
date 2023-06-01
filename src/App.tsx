import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Selections from './Pages/Selections';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/selections" element={<Selections />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
