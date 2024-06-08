import {
  FcLowPriority,
  FcHighPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Button, ScaleFade, Text, useDisclosure } from "@chakra-ui/react";
import { MenuIcon } from "../types";
import { useState } from "react";

interface PriorityDropdownMenuProps {
  handleDropdownOptionChange: (priorityText: string) => void;
}

const PriorityDropdownMenu: React.FC<PriorityDropdownMenuProps> = ({
  handleDropdownOptionChange,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const menuIconsData: MenuIcon[] = [
    {
      id: 1,
      text: "Low",
      icon: <FcLowPriority size={"1.2rem"} />,
    },
    {
      id: 2,
      text: "Medium",
      icon: <FcMediumPriority size={"1.2rem"} />,
    },
    {
      id: 3,
      text: "High",
      icon: <FcHighPriority size={"1.2rem"} />,
    },
  ];

  const handleOptionClick = (text: string) => {
    setSelectedOption(text);
    handleDropdownOptionChange(text);
    onToggle();
  };

  return (
    <Box>
      <Button
        gap={"2"}
        bg={"white"}
        borderRadius={"md"}
        px={"2rem"}
        onClick={onToggle}
        _hover={{ background: "white" }}
        w={{ base: "100%", md: "100%" }}
      >
        {selectedOption || "Priority"}
        <ArrowDownIcon />
      </Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box
          mt={"4"}
          bg={"white"}
          borderRadius={"md"}
          display={isOpen ? "block" : "none"}
        >
          {menuIconsData.map((i) => (
            <Box
              key={i.id}
              p={"2"}
              display={"flex"}
              alignItems={"center"}
              gap={"3"}
              _hover={{ background: "#ddd" }}
              cursor={"pointer"}
              onClick={() => handleOptionClick(i.text)}
            >
              <Text fontSize={"1rem"}>{i.text}</Text>
              {i.icon}
            </Box>
          ))}
        </Box>
      </ScaleFade>
    </Box>
  );
};
export default PriorityDropdownMenu;
