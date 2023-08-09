import axios from 'axios';

const JOB_API_BASE_URL = 'http://localhost:8080/api/jobs';

class JobService{

    getJobs(){
        let jobs = axios.get(JOB_API_BASE_URL);
        return jobs;
    }

    getJob(id){
        let job = axios.get(JOB_API_BASE_URL + '/' + id);
        return job;
    }

    saveEditedJob(job) {
        return axios.put(JOB_API_BASE_URL + '/' + job.id, job);
    }

    deleteJob(id) {
        return axios.delete(JOB_API_BASE_URL + '/' + id);
    }

    createJob(job) {
        return axios.post(JOB_API_BASE_URL, job);
    }
}

export default new JobService();