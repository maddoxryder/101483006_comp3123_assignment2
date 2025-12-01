import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    CircularProgress
} from "@mui/material";
import api from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/employees/${id}`).then((res) => {
            setEmployee(res.data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!employee) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography variant="h6">Employee not found.</Typography>
                <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate("/employees")}>
                    Back
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" mb={2} textAlign="center">
                    Employee Details
                </Typography>

                {employee.profilePicture && (
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <img
                            src={`http://localhost:5000/uploads/${employee.profilePicture}`}
                            alt="profile"
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "3px solid #ccc"
                            }}
                        />
                    </Box>
                )}

                <Typography variant="h6">
                    Name: <span style={{ fontWeight: 400 }}>{employee.name}</span>
                </Typography>

                <Typography variant="h6">
                    Department: <span style={{ fontWeight: 400 }}>{employee.department}</span>
                </Typography>

                <Typography variant="h6">
                    Position: <span style={{ fontWeight: 400 }}>{employee.position}</span>
                </Typography>

                <Typography variant="h6">
                    Salary: <span style={{ fontWeight: 400 }}>${employee.salary}</span>
                </Typography>

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() => navigate("/employees")}
                >
                    Back to List
                </Button>
            </Paper>
        </Container>
    );
};

export default EmployeeDetails;
