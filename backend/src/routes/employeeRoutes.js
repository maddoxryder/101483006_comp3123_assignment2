const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const controller = require('../controllers/employeeController');

router.post('/employees', auth, upload.single('profilePicture'), controller.createEmployee);
router.get('/employees', auth, controller.getEmployees);
router.get('/employees/:id', auth, controller.getEmployeeById);
router.put('/employees/:id', auth, upload.single('profilePicture'), controller.updateEmployee);
router.delete('/employees/:id', auth, controller.deleteEmployee);
router.get('/employees/search', auth, controller.searchEmployees);

module.exports = router;
