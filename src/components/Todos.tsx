import { getTodos } from "@/lib/fetchTodos";
import type { Todo } from "@/lib/drizzle";

const TodoList: React.FC = async () => {
  const { data }: { data: Todo[] } = await getTodos();
//   console.log(data);

  return (
    <div className="flex flex-col gap-3">
      {data?.map((todo, idx) => (
        <div key={idx} className="flex p-2 rounded-md border cursor-pointer">
          {todo.task}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
