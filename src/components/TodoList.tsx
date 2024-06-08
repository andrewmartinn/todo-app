import { Box, Divider, Text } from "@chakra-ui/react";
import { Todo } from "../types";
import TodoCard from "./TodoCard";

interface TodoListProps {
  todos: Todo[];
  handleDelete: (id: string) => void;
  handleToggleCompletion: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleDelete,
  handleToggleCompletion,
}) => {
  return (
    <Box w={"100%"} py={{ base: "2rem", lg: "0" }}>
      <Box pb={"2rem"}>
        <Text fontSize={"2xl"} pb={"1"}>
          Active Tasks
        </Text>
        <Divider />
      </Box>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          handleDelete={handleDelete}
          handleToggleCompletion={handleToggleCompletion}
        />
      ))}
    </Box>
  );
};
export default TodoList;
