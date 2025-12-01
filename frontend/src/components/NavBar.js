import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate('/employees')}>
                    Employee Manager
                </Typography>

                {token ? (
                    <Button color="inherit" onClick={logout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
