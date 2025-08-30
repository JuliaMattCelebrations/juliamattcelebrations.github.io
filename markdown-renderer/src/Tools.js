// src/Tools.js
import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  useColorModeValue,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import MarkdownEncryptRenderer from './MarkdownEncryptRenderer';
import MarkdownDecryptRenderer from './MarkdownDecryptRenderer';

const Tools = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <Box py={{ base: 6, md: 8 }} px={{ base: 4, md: 0 }}>
      <Container maxW="container.lg">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Box textAlign="center">
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              mb={{ base: 4, md: 6 }}
              bgGradient="linear(to-r, psyduck.500, duck.500)"
              bgClip="text"
            >
              🔧 Tools
            </Heading>
            <Heading
              size={{ base: "md", md: "lg" }}
              color="gray.500"
              fontWeight="normal"
              maxW="2xl"
              mx="auto"
            >
              Encrypt and decrypt your special messages
            </Heading>
          </Box>

          <Box
            bg={bg}
            border="2px"
            borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'}
            borderRadius="2xl"
            shadow="xl"
            overflow="hidden"
          >
            <Tabs
              index={tabIndex}
              onChange={setTabIndex}
              variant="enclosed"
              colorScheme="psyduck"
              isFitted
            >
              <Box
                bg={colorMode === 'light' ? 'psyduck.50' : 'psyduck.900'}
                borderBottom="1px"
                borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
              >
                <TabList>
                  <Tab
                    fontSize={{ base: "md", md: "lg" }}
                    py={{ base: 3, md: 4 }}
                    _selected={{
                      bg: colorMode === 'light' ? 'white' : 'gray.800',
                      borderColor: colorMode === 'light' ? 'psyduck.200' : 'psyduck.600',
                      color: 'psyduck.600'
                    }}
                    _hover={{
                      bg: colorMode === 'light' ? 'psyduck.100' : 'psyduck.800',
                      transform: 'translateY(-1px)'
                    }}
                    transition="all 0.2s"
                  >
                    🔐 Encrypt
                  </Tab>
                  <Tab
                    fontSize={{ base: "md", md: "lg" }}
                    py={{ base: 3, md: 4 }}
                    _selected={{
                      bg: colorMode === 'light' ? 'white' : 'gray.800',
                      borderColor: colorMode === 'light' ? 'psyduck.200' : 'psyduck.600',
                      color: 'psyduck.600'
                    }}
                    _hover={{
                      bg: colorMode === 'light' ? 'psyduck.100' : 'psyduck.800',
                      transform: 'translateY(-1px)'
                    }}
                    transition="all 0.2s"
                  >
                    🔓 Decrypt
                  </Tab>
                </TabList>
              </Box>

              <TabPanels>
                <TabPanel p={{ base: 4, md: 6 }}>
                  <Box
                    bg={colorMode === 'light' ? 'psyduck.50' : 'psyduck.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="xl"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
                  >
                    <VStack spacing={4} align="stretch">
                      <Box textAlign="center" mb={4}>
                        <Badge
                          colorScheme="psyduck"
                          variant="subtle"
                          fontSize={{ base: "md", md: "lg" }}
                          px={4}
                          py={2}
                          borderRadius="full"
                        >
                          🔐 Encryption Tool
                        </Badge>
                      </Box>
                      <MarkdownEncryptRenderer />
                    </VStack>
                  </Box>
                </TabPanel>
                <TabPanel p={{ base: 4, md: 6 }}>
                  <Box
                    bg={colorMode === 'light' ? 'duck.50' : 'duck.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="xl"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'duck.200' : 'duck.700'}
                  >
                    <VStack spacing={4} align="stretch">
                      <Box textAlign="center" mb={4}>
                        <Badge
                          colorScheme="duck"
                          variant="subtle"
                          fontSize={{ base: "md", md: "lg" }}
                          px={4}
                          py={2}
                          borderRadius="full"
                        >
                          🔓 Decryption Tool
                        </Badge>
                      </Box>
                      <MarkdownDecryptRenderer />
                    </VStack>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Tools;