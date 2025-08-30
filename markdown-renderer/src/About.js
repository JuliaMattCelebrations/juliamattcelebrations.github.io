// src/About.js
import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

const About = () => {
  const { colorMode } = useColorMode();
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box py={{ base: 6, md: 8 }} px={{ base: 4, md: 0 }}>
      <Container maxW="container.md">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Box textAlign="center">
            <Heading
              size={{ base: "2xl", md: "3xl" }}
              mb={{ base: 4, md: 6 }}
              bgGradient="linear(to-r, psyduck.500, duck.500)"
              bgClip="text"
            >
              🎉 About Our Celebration 🎉
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Celebrating love, memories, and beautiful moments together
            </Text>
          </Box>

          <Card
            bg={cardBg}
            border="2px"
            borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'}
            shadow="xl"
            borderRadius="xl"
            overflow="hidden"
          >
            <CardHeader
              bg={colorMode === 'light' ? 'psyduck.50' : 'psyduck.900'}
              borderBottom="1px"
              borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
              textAlign="center"
            >
              <VStack spacing={3}>
                <Badge
                  colorScheme="psyduck"
                  variant="subtle"
                  fontSize={{ base: "md", md: "lg" }}
                  px={4}
                  py={2}
                  borderRadius="full"
                >
                  🦆 One Year Anniversary! 🦆
                </Badge>
                <Heading size="lg" color="psyduck.600">
                  Our Love Story
                </Heading>
              </VStack>
            </CardHeader>
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                <Box
                  bg={colorMode === 'light' ? 'psyduck.50' : 'psyduck.900'}
                  p={{ base: 4, md: 6 }}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall" textAlign="center">
                    This website celebrates our special day and the beautiful journey we've shared together.
                    From the bustling streets of New York to the serene parks of Hawaii, every moment has been magical.
                  </Text>
                </Box>

                <Divider borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'} />

                <Box
                  bg={colorMode === 'light' ? 'duck.50' : 'duck.900'}
                  p={{ base: 4, md: 6 }}
                  borderRadius="lg"
                  border="1px"
                  borderColor={colorMode === 'light' ? 'duck.200' : 'duck.700'}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} lineHeight="tall" textAlign="center">
                    The encrypted notes contain special messages that only you can unlock with the right key.
                    Use the Tools page to encrypt and decrypt your own special messages.
                  </Text>
                </Box>

                <Box textAlign="center" py={4}>
                  <Box
                    bg={colorMode === 'light' ? 'pink.50' : 'pink.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="lg"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'pink.200' : 'pink.700'}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontStyle="italic"
                      color={colorMode === 'light' ? 'pink.800' : 'pink.200'}
                      fontWeight="medium"
                    >
                      "Love is not about finding the right person, but creating the right relationship."
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
