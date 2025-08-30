import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownEncryptRenderer = () => {
  const [markdown, setMarkdown] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const handleEncrypt = () => {
    try {
      const ciphertext = CryptoJS.AES.encrypt(markdown, privateKey).toString();
      setEncryptedText(ciphertext);
    } catch (error) {
      toast({
        title: 'Encryption failed',
        description: 'Please check your private key and markdown content.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    handleCopyToClipboard();
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(encryptedText).then(() => {
      toast({
        title: 'Success!',
        description: 'Encrypted text copied to clipboard!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }).catch((err) => {
      console.error('Failed to copy: ', err);
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            📝 Markdown Content
          </FormLabel>
          <Textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Enter your markdown here..."
            rows={10}
            size="lg"
            borderRadius="md"
            borderColor={borderColor}
            _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize="lg" fontWeight="bold">
            🔑 Private Key
          </FormLabel>
          <Input
            type="text"
            value={privateKey}
            onChange={handlePrivateKeyChange}
            placeholder="Enter your private key"
            size="lg"
            borderRadius="md"
            borderColor={borderColor}
            _focus={{ borderColor: 'blue.400', boxShadow: 'outline' }}
          />
        </FormControl>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleEncrypt}
          leftIcon={<span>🔐</span>}
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          Encrypt
        </Button>
      </VStack>

      {/* Preview Section */}
      {markdown && (
        <Box
          bg={bg}
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          shadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4} color="blue.500">
            📖 Preview
          </Text>
          <Box className="blog-post">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </Box>
        </Box>
      )}

      {/* Encrypted Output */}
      {encryptedText && (
        <Box
          bg={bg}
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          shadow="md"
        >
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                🔒 Encrypted Output
              </Text>
              <Button
                colorScheme="green"
                variant="outline"
                onClick={handleCopyToClipboard}
                size="sm"
              >
                📋 Copy
              </Button>
            </HStack>
            <Textarea
              value={encryptedText}
              readOnly
              rows={8}
              size="lg"
              borderRadius="md"
              borderColor={borderColor}
              bg={bg === 'white' ? 'gray.50' : 'gray.700'}
              fontFamily="mono"
            />
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default MarkdownEncryptRenderer;