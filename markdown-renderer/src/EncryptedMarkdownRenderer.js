import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CryptoJS from 'crypto-js';
import Confetti from 'react-confetti';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const EncryptedMarkdownRenderer = ({ filePath }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedMarkdown, setEncryptedMarkdown] = useState('');
  const [decryptedMarkdown, setDecryptedMarkdown] = useState('');
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showButton, setShowButton] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    // Fetch the encrypted markdown file from the repository
    fetch(filePath)
      .then(response => response.text())
      .then(data => setEncryptedMarkdown(data))
      .catch(error => console.error('Error fetching the file:', error));
  }, [filePath]);

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const handleDecrypt = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedMarkdown, privateKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        throw new Error('Decryption failed');
      }
      setDecryptedMarkdown(decryptedText);
      onClose(); // Close the modal on successful decryption
      setShowButton(false);
      setShowConfetti(true); // Trigger confetti
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    } catch (error) {
      setError('Decryption failed. Please check your private key and try again.');
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      {showConfetti && <Confetti />}

      {showButton && (
        <Box textAlign="center" mb={8}>
          <Button
            size="lg"
            colorScheme="purple"
            onClick={onOpen}
            px={8}
            py={6}
            fontSize="xl"
            borderRadius="full"
            _hover={{ transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
          🔓 Unlock the secret message
          </Button>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={bg} border="1px" borderColor={borderColor}>
          <ModalHeader color="purple.500">🔐 Enter your answer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Private Key</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the secret password"
                  value={privateKey}
                  onChange={handlePrivateKeyChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" onClick={handleDecrypt} size="lg">
              🔓 Decrypt
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {decryptedMarkdown && (
        <Box
          bg={bg}
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          shadow="lg"
        >
          <Box mb={6} textAlign="center">
            <Image
              src="/IMG_0007.JPG"
              alt="Celebration"
              borderRadius="lg"
              maxH="400px"
              mx="auto"
              shadow="md"
            />
          </Box>
          <Box>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {decryptedMarkdown}
            </ReactMarkdown>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default EncryptedMarkdownRenderer;