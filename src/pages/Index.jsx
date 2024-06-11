import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, List, ListItem, IconButton } from "@chakra-ui/react";
import { FaTrash, FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  const addTask = (task) => {
    if (task) {
      setTasks([...tasks, task]);
      setInputValue("");
      resetTranscript();
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleVoiceInput = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleAddTask = () => {
    addTask(inputValue || transcript);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Todo App with Voice Recognition</Text>
        <HStack width="100%">
          <Input
            placeholder="Enter a task"
            value={inputValue || transcript}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton
            aria-label="Add task"
            icon={<FaMicrophone />}
            onClick={handleVoiceInput}
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </HStack>
        <List spacing={3} width="100%">
          {tasks.map((task, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
              <Text>{task}</Text>
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => removeTask(index)}
              />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;