import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';
import NavBar from './components/NavBar';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/employees"
                    element={
                        <PrivateRoute>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/employees/new"
                    element={
                        <PrivateRoute>
                            <EmployeeForm mode="create" />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/employees/:id"
                    element={
                        <PrivateRoute>
                            <EmployeeDetails />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/employees/:id/edit"
                    element={
                        <PrivateRoute>
                            <EmployeeForm mode="edit" />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
