import { useState, useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import { Todo } from "./types";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
      } catch (error) {
        console.log("Failed to fetch data!", error);
      }
    };

    fetchData();
  }, []);

  const fetchTodos = async (): Promise<Todo[]> => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos!");
      }
      const data: Todo[] = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data!", error);
      return [];
    }
  };

  const fetchTodo = async (id: string): Promise<Todo | null> => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch todo!");
      }
      const data: Todo = await response.json();
      return data;
    } catch (error) {
      console.log("Error fetching data!", error);
      return null;
    }
  };

  const addTodo = async (newTodo: Todo) => {
    try {
      const response = await fetch(`http://localhost:5000/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data: Todo = await response.json();
      setTodos((prevTodos) => {
        return [...prevTodos, data];
      });
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodoCompletion = async (id: string) => {
    const todoToUpdate = await fetchTodo(id);

    if (todoToUpdate !== null) {
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      setTodos((prevTodos) => {
        return prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: data.completed } : todo
        );
      });
    }
  };

  return (
    <Box w={"100%"} minH={"100vh"} bg={"#f4f4f4"}>
      <Container maxW={"5xl"} py={"6rem"} centerContent>
        <Header />
        <AddTodo handleAdd={addTodo} />
        {todos.length <= 0 ? (
          <Box pt={"4rem"}>
            <Text fontSize={"xl"}>No Todos Added</Text>
          </Box>
        ) : (
          <TodoList
            todos={todos}
            handleDelete={deleteTodo}
            handleToggleCompletion={toggleTodoCompletion}
          />
        )}
      </Container>
    </Box>
  );
};

export default App;
