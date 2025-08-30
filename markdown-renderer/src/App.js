// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  extendTheme,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import Tools from './Tools';
import CelebrationBanner from './CelebrationBanner';
import About from './About';

// Custom Psyduck-themed theme
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    psyduck: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main Psyduck orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    duck: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Psyduck blue
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'psyduck',
      },
    },
  },
});

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.800', 'white');
  const headerBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh" bg={bg} color={color}>
          {/* Header */}
          <Box
            as="header"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            borderBottom="2px"
            borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
            backdropFilter="blur(20px)"
            bg={headerBg}
            boxShadow={colorMode === 'light' ? '0 4px 20px rgba(249, 115, 22, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.3)'}
          >
            <Container maxW="container.xl">
              <Flex justify="space-between" align="center" py={4}>
                {/* Logo and Brand */}
                <Link to="/">
                  <Flex align="center" cursor="pointer" _hover={{ transform: 'scale(1.05)' }} transition="all 0.2s">
                    <Box
                      as="img"
                      src="/logo512.png"
                      alt="Psyduck Logo"
                      w={{ base: "32px", md: "40px" }}
                      h={{ base: "32px", md: "40px" }}
                      mr={3}
                      borderRadius="full"
                      border="2px"
                      borderColor={colorMode === 'light' ? 'psyduck.300' : 'psyduck.600'}
                    />
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="bold"
                      color={color}
                      bgGradient={colorMode === 'light' ? 'linear(to-r, psyduck.500, duck.500)' : 'linear(to-r, psyduck.300, duck.300)'}
                      bgClip="text"
                    >
                      Our Day Celebration
                    </Text>
                  </Flex>
                </Link>

                {/* Desktop Navigation */}
                <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
                  <Link to="/">
                    <Button
                      variant="ghost"
                      color={color}
                      _hover={{
                        bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800',
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    >
                      🏠 Home
                    </Button>
                  </Link>
                  <Link to="/tools">
                    <Button
                      variant="ghost"
                      color={color}
                      _hover={{
                        bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800',
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    >
                      🔧 Tools
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button
                      variant="ghost"
                      color={color}
                      _hover={{
                        bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800',
                        transform: 'translateY(-2px)'
                      }}
                      transition="all 0.2s"
                    >
                      ℹ️ About
                    </Button>
                  </Link>
                </HStack>

                {/* Theme Toggle and Mobile Menu */}
                <HStack spacing={4}>
                  <IconButton
                    aria-label="Toggle color mode"
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    variant="ghost"
                    color={color}
                    _hover={{
                      bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800',
                      transform: 'scale(1.1)'
                    }}
                    transition="all 0.2s"
                    size={{ base: "sm", md: "md" }}
                  />

                  {/* Mobile Menu Button */}
                  <IconButton
                    aria-label="Open menu"
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                    variant="ghost"
                    color={color}
                    display={{ base: 'flex', md: 'none' }}
                    _hover={{
                      bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800',
                      transform: 'scale(1.1)'
                    }}
                    transition="all 0.2s"
                    size="sm"
                  />
                </HStack>
              </Flex>
            </Container>
          </Box>

          {/* Mobile Navigation Drawer */}
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
            <DrawerOverlay />
            <DrawerContent bg={bg} borderLeft="2px" borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}>
              <DrawerCloseButton color={color} />
              <DrawerHeader
                borderBottomWidth="2px"
                borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.700'}
                color={colorMode === 'light' ? 'psyduck.600' : 'psyduck.300'}
              >
                🦆 Menu
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="stretch" pt={4}>
                  <Link to="/" onClick={onClose}>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      color={color}
                      leftIcon={<span>🏠</span>}
                      _hover={{ bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800' }}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link to="/tools" onClick={onClose}>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      color={color}
                      leftIcon={<span>🔧</span>}
                      _hover={{ bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800' }}
                    >
                      Tools
                    </Button>
                  </Link>
                  <Link to="/about" onClick={onClose}>
                    <Button
                      variant="ghost"
                      w="full"
                      justifyContent="flex-start"
                      color={color}
                      leftIcon={<span>ℹ️</span>}
                      _hover={{ bg: colorMode === 'light' ? 'psyduck.50' : 'psyduck.800' }}
                    >
                      About
                    </Button>
                  </Link>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* Main Content */}
          <Box as="main" pt={{ base: "70px", md: "80px" }} minH="calc(100vh - 80px)">
            <Routes>
              <Route path="/tools" element={<Tools />} />
              <Route path="/about" element={<About />} />
              <Route path="" element={<CelebrationBanner />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;