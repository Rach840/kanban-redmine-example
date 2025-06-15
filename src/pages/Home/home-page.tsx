import {useQuery} from "@tanstack/react-query";
import {taskService} from "../../entity";


export function Home() {
    const query = useQuery({ queryKey: ['todos'], queryFn: async () => await taskService.getStatuses() });
    console.log(query)
return (
    <h1 className='asd'>asdasdsda</h1>
)
}