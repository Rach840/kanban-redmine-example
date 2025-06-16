import {useQuery} from "@tanstack/react-query";
import {taskService} from "../../entity";
import {Dropdown} from "primereact/dropdown";
import {useCallback, useEffect, useState} from "react";
import {DragDropContext, Droppable, type DropResult,} from "react-beautiful-dnd";
import TaskColumn from "@/entity/tasks/ui/taskColumn.tsx";

export function Home() {
    const [issuesByProject, setIssuesByProject] = useState([
        {
            author: {id: 1, name: 'Redmine Admin'},
            closed_on: null,
            created_on: "2025-06-16T00:36:22Z",
            description: "",
            done_ratio: 0,
            due_date: null,
            estimated_hours: null,
            id: 1,
            issues: [],
            is_private: false,
            priority: {id: 1, name: 'Средняя'},
            project: {id: 2, name: 'kanban'},
            start_date: "2025-06-16",
            status: {id: 1, name: 'Создано', is_closed: false},
            subject: "Тест",
            total_estimated_hours: null,
            tracker: {id: 1, name: 'Работаем'},
            updated_on: "2025-06-16T00:36:22Z"
        }
    ]);
    const {data: projects} = useQuery({queryKey: ['projects'], queryFn: async () => await taskService.getProjects()});
    const {data: issues, isFetched} = useQuery({
        queryKey: ['issues'],
        queryFn: async () => await taskService.getIssues()
    });
    const {data: statuses, isFetched: isFetchedStatuses} = useQuery({
        queryKey: ['statuses'],
        queryFn: async () => await taskService.getStatuses()
    });
    console.log('sdfasdf', statuses)
    useEffect(() => {
        if (isFetched) {
            console.log('sadas', projects);
            const issuesProjects = projects?.map(item => {
                const issuesFiltered = issues.filter(issue => issue.project.id == item.id)
                return {
                    ...item,
                    issues: issuesFiltered,
                }
            });
            console.log(issuesProjects);
            setIssuesByProject(issuesProjects);
        }
    }, [issues])

    const [selectedProjectsByIssues, setSelectedProjectsByIssues] = useState(issuesByProject[0]);
    console.log('selected', selectedProjectsByIssues)
    const onDragEnd = useCallback(async (result: DropResult) => {
        const {source, destination, draggableId} = result;
        console.log(source, destination, draggableId);
        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            const newStatus = destination.droppableId;
            const taskId = draggableId;

           await taskService.changeStatus(taskId, newStatus)

        }
    }, []);
    return (
        <div className='my-4'>
            <div className="flex items-center space-x-4">
                <h3 className="text-xl">Выберите проект</h3>
                <Dropdown value={selectedProjectsByIssues} onChange={(e) => setSelectedProjectsByIssues(e.value)}
                          options={issuesByProject} optionLabel="name"
                          placeholder="Выберите проект" className=" "/>
            </div>
            <div className=" min-h-screen">
                <div className="container mx-auto p-4 h-screen flex flex-col">

                    <DragDropContext onDragEnd={onDragEnd}>
                        {projects ? (
                            <div className="flex flex-col md:flex-row flex-grow overflow-x-auto gap-4">
                                {statuses?.map((status) => (

                                    <Droppable droppableId={status.id} key={status.name}>
                                        {(provided, snapshot) => (
                                            <TaskColumn name={status.name} project={selectedProjectsByIssues.name}
                                                        description={status.description}
                                                        tasks={selectedProjectsByIssues?.issues.filter(item => item.status.id == status.id)}
                                                        provided={provided}
                                                        snapshot={snapshot}
                                            />
                                        )}
                                    </Droppable>

                            ))}
                        </div>
                    ) : null}
                </DragDropContext>
            </div>
        </div>

    </div>
)
}