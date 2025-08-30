import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Badge,
  IconButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import EncryptedMarkdownRenderer from './EncryptedMarkdownRenderer';

const CelebrationBanner = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box py={{ base: 6, md: 8 }} px={{ base: 4, md: 0 }}>
      <Container maxW="container.lg">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          {/* Main Celebration Header */}
          <Box textAlign="center">
            <Heading
              size={{ base: "3xl", md: "4xl" }}
              mb={{ base: 4, md: 6 }}
              bgGradient="linear(to-r, psyduck.500, duck.500, psyduck.400)"
              bgClip="text"
              letterSpacing="tight"
              lineHeight="shorter"
            >
              🎉 ONE YAD! 🎉
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              mx="auto"
              fontWeight="medium"
            >
              Here's a riddle for you (3 parts):
            </Text>
          </Box>

          {/* Riddle Card */}
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
            >
              <HStack justify="space-between" align="center">
                <Heading size="lg" color="psyduck.600">
                  🧩 The Riddle
                </Heading>
                <Tooltip label={showAnswer ? "Hide answer" : "Show answer"}>
                  <IconButton
                    aria-label="Toggle answer visibility"
                    icon={showAnswer ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowAnswer(!showAnswer)}
                    variant="ghost"
                    colorScheme="psyduck"
                    size="sm"
                    _hover={{ transform: 'scale(1.1)' }}
                    transition="all 0.2s"
                  />
                </Tooltip>
              </HStack>
            </CardHeader>
            <CardBody p={{ base: 4, md: 6 }}>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                {/* Part 1 */}
                <Box textAlign="center">
                  <HStack justify="center" mb={3}>
                    <Badge
                      colorScheme="pink"
                      variant="subtle"
                      fontSize={{ base: "sm", md: "md" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Part 1
                    </Badge>
                  </HStack>
                  <Box
                    bg={colorMode === 'light' ? 'pink.50' : 'pink.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="lg"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'pink.200' : 'pink.700'}
                  >
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      lineHeight="tall"
                      fontStyle="italic"
                      color={colorMode === 'light' ? 'pink.800' : 'pink.200'}
                      whiteSpace="pre-line"
                      textAlign="center"
                    >
                      "She waddles on water, quacking with glee.
                      In Hawaii's warm sun, she feels so free.
                      From New York's skyline to Jollyman Park,
                      I love her beautiful smile on each journey we embark.

                      My journey's complete with a name that's dear.
                      The one I adore, who always is near.

                      Today is the day we tangled in love, stuck by you"
                    </Text>
                  </Box>
                </Box>

                <Divider borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'} />

                {/* Part 2 */}
                <Box textAlign="center">
                  <HStack justify="center" mb={3}>
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      fontSize={{ base: "sm", md: "md" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Part 2
                    </Badge>
                  </HStack>
                  <Box
                    bg={colorMode === 'light' ? 'blue.50' : 'blue.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="lg"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'blue.200' : 'blue.700'}
                  >
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="bold"
                      color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
                      letterSpacing="wider"
                    >
                      mmdd
                    </Text>
                  </Box>
                </Box>

                <Divider borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'} />

                {/* Part 3 */}
                <Box textAlign="center">
                  <HStack justify="center" mb={3}>
                    <Badge
                      colorScheme="green"
                      variant="subtle"
                      fontSize={{ base: "sm", md: "md" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Part 3 (Matt's version)
                    </Badge>
                  </HStack>
                  <Box
                    bg={colorMode === 'light' ? 'green.50' : 'green.900'}
                    p={{ base: 4, md: 6 }}
                    borderRadius="lg"
                    border="1px"
                    borderColor={colorMode === 'light' ? 'green.200' : 'green.700'}
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontStyle="italic"
                      color={colorMode === 'light' ? 'green.600' : 'green.300'}
                      whiteSpace="pre-line"
                      textAlign="center"
                    >
                      I am so brat. I am so _____ LA LA LA LA LA
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Encrypted Note */}
          <Card
            bg={cardBg}
            border="2px"
            borderColor={colorMode === 'light' ? 'duck.200' : 'duck.600'}
            shadow="xl"
            borderRadius="xl"
            overflow="hidden"
          >
            <CardHeader
              bg={colorMode === 'light' ? 'duck.50' : 'duck.900'}
              borderBottom="1px"
              borderColor={colorMode === 'light' ? 'duck.200' : 'duck.700'}
            >
              <Heading size="lg" color="duck.600" textAlign="center">
                💌 Encrypted Message
              </Heading>
            </CardHeader>
            <CardBody p={{ base: 4, md: 6 }}>
              <EncryptedMarkdownRenderer filePath="/encrypted-wub-note.md" />
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default CelebrationBanner;