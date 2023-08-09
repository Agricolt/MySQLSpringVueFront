export default class Employee {
    constructor(firstName, surname, phoneNumber, isManager, jobId, managerId) {
        this.firstName = firstName;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.isManager = isManager;
        this.jobId = jobId;
        this.managerId = managerId;
    }
}