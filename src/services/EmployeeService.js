import axios from 'axios';
import Employee from '@/dto/Employee';

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/employees';

class EmployeeService{

    getEmployees(){
        let employees = axios.get(EMPLOYEE_API_BASE_URL + '/employees');
        return employees;
    }

    getEmployee(id){
        let employee = axios.get(EMPLOYEE_API_BASE_URL + '/' + id);
        return employee;
    }

    saveEditedEmployee(employee, job) {
        let employeeDto = new Employee(employee.firstName, employee.surname, employee.phoneNumber, employee.isManager, job.id, employee.managerId);
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employee.id, employeeDto);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }

    createEmployee(employeeDto) {
        return axios.post(EMPLOYEE_API_BASE_URL, employeeDto);
    }
}

export default new EmployeeService();