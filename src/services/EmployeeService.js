import axios from 'axios';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees/employees';

class EmployeeService{

    getEmployees(){
        let employees = axios.get(EMPLOYEE_API_BASE_URL);
        return employees;
    }
}

export default new EmployeeService();