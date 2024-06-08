import { useState } from "react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input } from "@chakra-ui/react";

import PriorityDropdownMenu from "./PriorityDropdownMenu";
import { Todo } from "../types";

interface AddTodoProps {
  handleAdd: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ handleAdd }) => {
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const handleDropdownOptionChange = (priorityText: string) => {
    setPriority(priorityText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: `${Math.floor(Math.random() * 10000)}`,
      text: text,
      priority: priority,
      completed: false,
    };

    handleAdd(newTodo);
    setText("");
    setPriority("");
  };

  return (
    <Box pt={"3rem"} w={"100%"} pb={"2rem"}>
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: "column", lg: "row" }} gap={"6"}>
          <Input
            type={"text"}
            outline={"none"}
            bg={"white"}
            placeholder={"Enter Todo..."}
            focusBorderColor={"transparent"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <PriorityDropdownMenu
            handleDropdownOptionChange={handleDropdownOptionChange}
          />
          <Button gap={"2"} px={"8"} colorScheme={"blue"} type={"submit"}>
            Add Todo
            <PlusSquareIcon />
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
export default AddTodo;
