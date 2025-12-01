import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    TextField,
    Paper,
    IconButton,
} from '@mui/material';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const fetchEmployees = async (searchParams) => {
    const { department, position } = searchParams;

    const res = await api.get('/employees', {
        params: {
            department: department || undefined,
            position: position || undefined,
        },
    });

    return res.data;
};

const EmployeeList = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');

    const { data: employees = [], refetch } = useQuery({
        queryKey: ['employees', { department, position }],
        queryFn: () => fetchEmployees({ department, position }),
    });

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        await api.delete(`/employees/${id}`);
        queryClient.invalidateQueries(['employees']);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Employee List
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Search Employees
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        label="Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        sx={{ flex: 1 }}
                    />
                    <Button variant="contained" onClick={() => refetch()}>
                        Search
                    </Button>
                </Box>
            </Paper>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => navigate('/employees/new')}
            >
                Add Employee
            </Button>

            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {employees.map((emp) => (
                            <TableRow key={emp._id}>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>{emp.position}</TableCell>
                                <TableCell>{emp.salary}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/employees/${emp._id}`)}>
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton color="secondary" onClick={() => navigate(`/employees/${emp._id}/edit`)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton color="error" onClick={() => handleDelete(emp._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {employees.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No employees found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default EmployeeList;
