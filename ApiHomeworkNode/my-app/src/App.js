import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const App = () => {
  const [studentName, setStudentName] = useState('');
  const [studentAvg, setStudentAvg] = useState('');
  const [students, setStudents] = useState([]);

  const studentNameInput = e => {
    setStudentName(e.target.value);
  };

  const studentAvgInput = e => {
    setStudentAvg(e.target.value);
  };

  //ja povikuvame datata od nasiot server so async funkcija

  useEffect(() => {
    async function fetchStudentData() {
      const response = await axios.get('http://localhost:8080/students');
      return response.data;
    }

    fetchStudentData()
      .then(data => setStudents(data))
      .catch(error => console.error(error));
  }, []);

  //post funkcija so parametar -> parametarot ke go definirame vo submitHandler kade sto ke bide objekt
  async function addNewStudent(newStudent) {
    const response = await axios.post(
      'http://localhost:8080/students',
      newStudent
    );
    return response.data;
  }

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const newStudent = { name: studentName, avg: studentAvg };
      const response = await addNewStudent(newStudent);

      setStudents([...students, response]);
      setStudentName('');
      setStudentAvg('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Flex gap={10} alignItems="center" flexDir={{ base: 'column' }}>
              <Box width={500} bg={'blackAlpha.500'} p={10} borderRadius={8}>
                <Flex gap={5} flexDir={'column'}>
                  <form onSubmit={submitHandler}>
                    <FormControl isRequired>
                      <FormLabel>Enter Student Name:</FormLabel>
                      <Input
                        type={'text'}
                        placeholder="Student name..."
                        value={studentName}
                        onChange={studentNameInput}
                      ></Input>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel mt={5}>Enter Student Average:</FormLabel>
                      <Input
                        placeholder="Student average..."
                        type={'number'}
                        value={studentAvg}
                        onChange={studentAvgInput}
                      ></Input>
                    </FormControl>
                    <FormControl>
                      <Button type="submit" mt={5}>
                        Submit
                      </Button>
                    </FormControl>
                  </form>
                </Flex>
              </Box>
              <Box
                width={800}
                bg={'blackAlpha.500'}
                p={10}
                borderRadius={8}
                overflowX={'auto'}
              >
                <TableContainer>
                  <Table variant="simple">
                    <TableCaption>List of students</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Full Name</Th>
                        <Th>Average</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {students.map(student => (
                        <Tr key={student.id}>
                          <Td>{student.name}</Td>
                          <Td>{student.avg}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
