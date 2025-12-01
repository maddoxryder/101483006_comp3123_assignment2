import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Alert,
} from "@mui/material";
import api from "../api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeForm = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = mode === "edit";

    const [employee, setEmployee] = useState({
        name: "",
        department: "",
        position: "",
        salary: "",
    });

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEdit && id) {
            api.get(`/employees/${id}`).then((res) => {
                setEmployee({
                    name: res.data.name || "",
                    department: res.data.department || "",
                    position: res.data.position || "",
                    salary: res.data.salary || "",
                });
            });
        }
    }, [isEdit, id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!employee.name || !employee.department || !employee.position) {
            setError("Name, Department, and Position are required.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", employee.name);
            formData.append("department", employee.department);
            formData.append("position", employee.position);
            formData.append("salary", employee.salary);

            if (file) formData.append("profilePicture", file);

            if (!isEdit) {
                await api.post("/employees", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.put(`/employees/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            navigate("/employees");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" mb={2}>
                    {isEdit ? "Update Employee" : "Add New Employee"}
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        margin="normal"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        name="department"
                        label="Department"
                        margin="normal"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        name="position"
                        label="Position"
                        margin="normal"
                        value={employee.position}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        name="salary"
                        label="Salary"
                        type="number"
                        margin="normal"
                        value={employee.salary}
                        onChange={handleChange}
                    />

                    <Box mt={2}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Profile Picture (optional)
                        </Typography>

                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        {isEdit ? "Update Employee" : "Add Employee"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EmployeeForm;
