import axios from 'axios';

class TasksService {
    url = 'http://localhost:80';
    async getStatuses(){
        console.log('asdad')
const {data} = await axios.get(`${this.url}/issue_statuses.json`);
        console.log('fasdf',data);
        return data.issue_statuses ;
    }
    async getIssues() {
     const {data}  = await axios.get(`${this.url}/issues.json`);
     return data?.issues;
    }
    async getProjects() {
        const {data}  = await axios.get(`${this.url}/projects.json`);
        return data.projects;
    }
    async changeStatus(id:string, newStatus:number) {
        console.log(id,newStatus, `${this.url}/issues/${id}.json`)
        const {data} = await axios.put(`${this.url}/issues/${id}.json`, {
            body: {
                status_id: newStatus
            }
        });
        console.log(data)
    }
}
export const taskService = new TasksService()