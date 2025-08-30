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
import BeautifulMarkdownRenderer from './BeautifulMarkdownRenderer';

const MarkdownDecryptRenderer = () => {
  const [encryptedMarkdown, setEncryptedMarkdown] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [decryptedMarkdown, setDecryptedMarkdown] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleEncryptedMarkdownChange = (event) => {
    setEncryptedMarkdown(event.target.value);
  };

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
    } catch (error) {
      setError('Decryption failed. Please check your private key and try again.');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(decryptedMarkdown).then(() => {
      toast({
        title: 'Success!',
        description: 'Decrypted text copied to clipboard!',
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
            🔒 Encrypted Markdown
          </FormLabel>
          <Textarea
            value={encryptedMarkdown}
            onChange={handleEncryptedMarkdownChange}
            placeholder="Enter your encrypted markdown here..."
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
          colorScheme="green"
          size="lg"
          onClick={handleDecrypt}
          leftIcon={<span>🔓</span>}
          _hover={{ transform: 'scale(1.02)' }}
          transition="all 0.2s"
        >
          Decrypt and Render
        </Button>

        {error && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {error}
          </Text>
        )}
      </VStack>

      {/* Decrypted Output */}
      {decryptedMarkdown && (
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
                📖 Decrypted Content
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
              value={decryptedMarkdown}
              readOnly
              rows={8}
              size="lg"
              borderRadius="md"
              borderColor={borderColor}
              bg={bg === 'white' ? 'gray.50' : 'gray.700'}
              fontFamily="mono"
            />

            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="blue.500">
                📖 Rendered Preview
              </Text>
              <Box className="blog-post">
                <BeautifulMarkdownRenderer>
                  {decryptedMarkdown}
                </BeautifulMarkdownRenderer>
              </Box>
            </Box>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default MarkdownDecryptRenderer;