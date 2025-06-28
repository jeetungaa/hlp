import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Home } from './pages';
import { Auth } from './components';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
  <Router>
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  </Router>
  </AuthProvider>
  );
};

export default App