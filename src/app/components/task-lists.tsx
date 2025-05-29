import { getTasks } from "@/services/tasks";

type Props = {
    tenantId: number;
}
export default async function TaskLists({ tenantId }: Props) {
    const tasks = await getTasks(tenantId);
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <strong>{task.label}</strong>
                </li>
            ))}
        </ul>
    );
}