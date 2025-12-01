const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.profilePicture = req.file.filename;
        }

        const employee = await Employee.create(data);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

exports.getEmployeeById = async (req, res) => {
    const emp = await Employee.findById(req.params.id);
    res.json(emp);
};

exports.updateEmployee = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.profilePicture = req.file.filename;
        }

        const emp = await Employee.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(emp);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};

exports.searchEmployees = async (req, res) => {
    const { department, position } = req.query;
    const query = {};

    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query);
    res.json(employees);
};
