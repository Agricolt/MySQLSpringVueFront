import axios from 'axios';

import Project from '../dto/Project'
const PROJECT_API_BASE_URL = 'http://localhost:8080/api/projects';

class ProjectService{

    getProjects(){
        let projects = axios.get(PROJECT_API_BASE_URL);
        return projects;
    }

    getProject(id){
        let project = axios.get(PROJECT_API_BASE_URL + '/' + id );
        return project;
    }

    saveEditedProject(project) {
        let projectDto = new Project(project.projectName, new Date(project.startDate).toISOString(), new Date(project.endDate).toISOString())
        return axios.put(PROJECT_API_BASE_URL + '/' + project.id, projectDto);
    }

    deleteProject(id) {
        return axios.delete(PROJECT_API_BASE_URL + '/' + id);
    }

    createProject(project) {
        let projectDto = new Project(project.projectName, new Date(project.startDate).toISOString(), new Date(project.endDate).toISOString())
        return axios.post(PROJECT_API_BASE_URL, projectDto);
    }

    assignEmployeeToProject(projectId, employeeId){
        return axios.post(PROJECT_API_BASE_URL + '/' + projectId + '/assign-employee/' + employeeId);
    }

    removeEmployeeFromProject(projectId, employeeId){
        return axios.delete(PROJECT_API_BASE_URL + '/' + projectId + '/remove-employee/' + employeeId);
    }
}

export default new ProjectService();