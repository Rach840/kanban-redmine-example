import {Draggable, type DroppableProvided, type DroppableStateSnapshot,} from "react-beautiful-dnd";
import {Badge, Card, CardContent, CardHeader, CardTitle,} from "@/shared/ui";


export interface Task {
    author:  {id: number, name: string};
    closed_on: null
    created_on:string
    description:string
    done_ratio: number
    due_date: null
    estimated_hours: null | number
    id: number
    is_privateL:boolean
    priority:{id: number, name: string}
    project:{id: number, name: string}
    start_date:string
    status:{id: number, name: string, is_closed: boolean}
    subject:string
    total_estimated_hours:null
    tracker: {id: number, name: string}
    updated_on:string
}
interface TaskColumnProps {
    name: string;
    description: string;
    tasks: Task[];
    provided: DroppableProvided;
    snapshot: DroppableStateSnapshot;
}

export default function TaskColumn({
                                       name,
                                       description,
                                       tasks,
                                       provided,
                                   }: TaskColumnProps) {
    return (
        <Card className="w-full md:w-80 flex-shrink-0 flex flex-col h-[calc(100vh-200px)] md:h-full bg-[#F1F5F9] border-[#E2E8F0]">
                <>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[#334155]">
                            <div className="flex items-center gap-3">
                                <div
                                    className='h-[18px] w-[18px] border-[2px] rounded-full'
                                />
                                {name}
                                <Badge
                                    variant="secondary"
                                    className="bg-[#E2E8F0] text-[#334155]"
                                >
                                    {tasks?.length}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-400">{description}</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-x-hidden overflow-y-auto body">
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="min-h-[100px] transition-colors duration-300"
                        >
                            {tasks?.map((task, index) => (
                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`relative mb-4 transition-all duration-300 ${
                                                snapshot.isDragging ? "opacity-50" : ""
                                            }`}
                                            style={{
                                                ...provided.draggableProps.style,
                                            }}

                                        >
                                            <Card className="bg-[#F1F5F9]  cursor-pointer hover:bg-[#E2E8F0] transition-colors">
                                                <CardContent className="px-4 ">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-start justify-between space-x-3 flex-grow">

                                                            <h3 className="font-semibold text-[#334155] line-clamp-2">
                                                                {task.subject}
                                                            </h3>
                                                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">

                                </span>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="flex flex-col text-xs text-gray-400 mt-2">
                                                        <div className="flex z-50 items-center justify-between mb-1">
                              <span className="font-semibold text-[#334155]">
                                Трекер:
                              </span>
                                                            <span className="flex gap-3 bg-[#E2E8F0] rounded px-2 py-1">
                                <p>{task.tracker.name}</p>
                              </span>
                                                        </div>
                                                        <div className="flex z-50 items-center justify-between mb-1">
                              <span className="font-semibold text-[#334155]">
                                Приоритет:
                              </span>
                                                            <span className="flex gap-3 bg-[#E2E8F0] rounded px-2 py-1">
                                <p>{task.priority.name}</p>
                              </span>
                                                        </div>

                                                    </div>

                                                </CardContent>
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    </CardContent>

                </>
        </Card>
    );
}
