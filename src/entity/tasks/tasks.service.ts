import axios from 'axios';

class TasksService {
    async getStatuses(){
        console.log('asdad')
const response = await axios.get("http://localhost:80/issue_statuses.json");
const status = await response.json();
        console.log('fasdf',status);
return status;
    }
}
export const taskService = new TasksService()