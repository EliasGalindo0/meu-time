import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Countries from './Pages/Countries';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
