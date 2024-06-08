import {
  FcLowPriority,
  FcHighPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { Card, Flex, IconButton, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import { IconMap, Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  handleDelete: (id: string) => void;
  handleToggleCompletion: (id: string) => void;
}

const iconMap: IconMap = {
  High: FcHighPriority,
  Medium: FcMediumPriority,
  Low: FcLowPriority,
};

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  handleDelete,
  handleToggleCompletion,
}) => {
  const PriorityIcon = iconMap[todo.priority];
  const animateProps = {
    layout: true,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { type: "spring", duration: 0.5 },
  };

  return (
    <motion.div {...animateProps}>
      <Card mb={"4"} p={"3"} opacity={todo.completed ? "0.4" : "1"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={"2"} alignItems={"center"}>
            {PriorityIcon && <PriorityIcon size={"22px"} />}
            <Text
              textDecoration={todo.completed ? "line-through" : ""}
              fontSize={"xl"}
            >
              {todo.text}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={"2"}>
            <IconButton
              bg={"#f4f4f4"}
              aria-label="complete-todo"
              size="xs"
              icon={<CheckIcon />}
              onClick={() => handleToggleCompletion(todo.id)}
            />
            <IconButton
              bg={"#f4f4f4"}
              aria-label="delete-todo"
              size="xs"
              icon={<CloseIcon />}
              onClick={() => handleDelete(todo.id)}
            />
          </Flex>
        </Flex>
      </Card>
    </motion.div>
  );
};
export default TodoCard;
