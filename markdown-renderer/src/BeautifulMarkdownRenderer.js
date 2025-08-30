import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import './BeautifulMarkdownRenderer.css';
import {
  Box,
  Text,
  Heading,
  Link,
  List,
  ListItem,
  Code,
  Divider,
  Image,
  Table,
  Thead,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  LinkIcon,
} from '@chakra-ui/icons';

const BeautifulMarkdownRenderer = ({ children, ...props }) => {
  const { colorMode } = useColorMode();

  // Add data-theme attribute for CSS targeting
  const themeAttribute = { 'data-theme': colorMode };

  // Theme-aware colors - more personal, less corporate
  const borderColor = useColorModeValue('gray.300', 'gray.500');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const linkColor = useColorModeValue('blue.600', 'blue.300');
  const codeBg = useColorModeValue('gray.50', 'gray.700');
  const blockquoteBg = useColorModeValue('orange.50', 'orange.900');
  const blockquoteBorder = useColorModeValue('orange.300', 'orange.600');
  const tableBg = useColorModeValue('gray.50', 'gray.700');
  const tableBorder = useColorModeValue('gray.300', 'gray.500');

  // Custom components for enhanced rendering
  const components = {
    // Personal headings - less corporate
    h1: ({ children, ...props }) => (
      <Heading
        as="h1"
        size="2xl"
        mb={6}
        color={headingColor}
        borderBottom="2px"
        borderColor={colorMode === 'light' ? 'orange.200' : 'orange.600'}
        pb={2}
        fontFamily="Georgia, serif"
        {...props}
      >
        {children}
      </Heading>
    ),

    h2: ({ children, ...props }) => (
      <Heading
        as="h2"
        size="xl"
        mb={4}
        color={headingColor}
        fontFamily="Georgia, serif"
        {...props}
      >
        {children}
      </Heading>
    ),

    h3: ({ children, ...props }) => (
      <Heading
        as="h3"
        size="lg"
        mb={3}
        color={headingColor}
        {...props}
      >
        {children}
      </Heading>
    ),

    // Enhanced links with icons and hover effects
    a: ({ children, href, ...props }) => (
      <Link
        href={href}
        color={linkColor}
        textDecoration="underline"
        _hover={{
          color: colorMode === 'light' ? 'blue.800' : 'blue.300',
          textDecoration: 'none',
          transform: 'translateY(-1px)',
        }}
        transition="all 0.2s"
        display="inline-flex"
        alignItems="center"
        gap={1}
        {...props}
      >
        {children}
        {href?.startsWith('http') ? <ExternalLinkIcon boxSize={3} /> : <LinkIcon boxSize={3} />}
      </Link>
    ),

    // Enhanced code blocks with syntax highlighting
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';

      if (inline) {
        return (
          <Code
            bg={codeBg}
            color={colorMode === 'light' ? 'gray.800' : 'gray.100'}
            px={2}
            py={1}
            borderRadius="md"
            fontSize="sm"
            fontFamily="mono"
            {...props}
          >
            {children}
          </Code>
        );
      }

      return (
        <Box
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          border="1px"
          borderColor={borderColor}
          my={4}
        >
          {language && (
            <Badge
              position="absolute"
              top={2}
              right={2}
              zIndex={1}
              colorScheme="orange"
              variant="solid"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
            >
              {language}
            </Badge>
          )}
          <SyntaxHighlighter
            style={colorMode === 'light' ? oneLight : oneDark}
            language={language}
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              borderRadius: '0.5rem',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      );
    },

    // Enhanced blockquotes with icons and styling
    blockquote: ({ children, ...props }) => (
      <Box
        as="blockquote"
        bg={blockquoteBg}
        borderLeft="4px"
        borderColor={blockquoteBorder}
        pl={6}
        py={4}
        pr={4}
        my={6}
        borderRadius="lg"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '16px',
          height: '16px',
          bg: blockquoteBorder,
          borderRadius: '50%',
        }}
        {...props}
      >
        <Text
          fontSize="lg"
          fontStyle="italic"
          color={colorMode === 'light' ? 'blue.800' : 'blue.200'}
          lineHeight="tall"
        >
          {children}
        </Text>
      </Box>
    ),

    // Enhanced lists with custom bullets and spacing
    ul: ({ children, ...props }) => (
      <List spacing={2} pl={6} {...props}>
        {children}
      </List>
    ),

    ol: ({ children, ...props }) => (
      <List as="ol" spacing={2} pl={6} listStyleType="decimal" {...props}>
        {children}
      </List>
    ),

    li: ({ children, ...props }) => (
      <ListItem
        color={textColor}
        lineHeight="tall"
        _before={{
          content: '""',
          display: 'inline-block',
          width: '6px',
          height: '6px',
          bg: colorMode === 'light' ? 'orange.400' : 'orange.300',
          borderRadius: '50%',
          mr: 3,
          verticalAlign: 'middle',
        }}
        {...props}
      >
        {children}
      </ListItem>
    ),

    // Enhanced tables with better styling
    table: ({ children, ...props }) => (
      <Box
        overflowX="auto"
        borderRadius="lg"
        border="1px"
        borderColor={tableBorder}
        my={6}
      >
        <Table
          variant="simple"
          bg={tableBg}
          {...props}
        >
          {children}
        </Table>
      </Box>
    ),

    thead: ({ children, ...props }) => (
      <Thead bg={colorMode === 'light' ? 'gray.100' : 'gray.600'} {...props}>
        {children}
      </Thead>
    ),

    th: ({ children, ...props }) => (
      <Th
        color={headingColor}
        fontWeight="bold"
        py={3}
        px={4}
        borderBottom="2px"
        borderColor={tableBorder}
        {...props}
      >
        {children}
      </Th>
    ),

    td: ({ children, ...props }) => (
      <Td
        color={textColor}
        py={3}
        px={4}
        borderBottom="1px"
        borderColor={tableBorder}
        {...props}
      >
        {children}
      </Td>
    ),

    // Enhanced images with captions and borders
    img: ({ src, alt, ...props }) => (
      <Box textAlign="center" my={6}>
        <Image
          src={src}
          alt={alt}
          maxW="100%"
          h="auto"
          borderRadius="lg"
          border="2px"
          borderColor={borderColor}
          shadow="lg"
          _hover={{
            transform: 'scale(1.02)',
            shadow: 'xl',
          }}
          transition="all 0.3s"
          {...props}
        />
        {alt && (
          <Text
            mt={2}
            fontSize="sm"
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            fontStyle="italic"
          >
            {alt}
          </Text>
        )}
      </Box>
    ),

    // Enhanced horizontal rules
    hr: ({ ...props }) => (
      <Divider
        borderColor={colorMode === 'light' ? 'psyduck.200' : 'psyduck.600'}
        borderWidth="2px"
        my={8}
        opacity={0.6}
        {...props}
      />
    ),

    // Enhanced paragraphs with better typography
    p: ({ children, ...props }) => (
      <Text
        color={textColor}
        lineHeight="tall"
        mb={4}
        fontSize="md"
        {...props}
      >
        {children}
      </Text>
    ),

    // Enhanced strong text
    strong: ({ children, ...props }) => (
      <Text
        as="strong"
        fontWeight="bold"
        color={colorMode === 'light' ? 'gray.900' : 'white'}
        {...props}
      >
        {children}
      </Text>
    ),

    // Enhanced emphasis text
    em: ({ children, ...props }) => (
      <Text
        as="em"
        fontStyle="italic"
        color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
        {...props}
      >
        {children}
      </Text>
    ),
  };

  return (
    <Box
      className="beautiful-markdown"
      color={textColor}
      fontSize="md"
      lineHeight="tall"
      {...themeAttribute}
      sx={{
        // Custom scrollbar styling
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: colorMode === 'light' ? 'psyduck.300' : 'psyduck.600',
          borderRadius: '4px',
          '&:hover': {
            bg: colorMode === 'light' ? 'psyduck.400' : 'psyduck.500',
          },
        },

        // Enhanced typography
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          scrollMarginTop: '100px',
        },

        // Link hover effects
        '& a:hover': {
          textDecoration: 'none',
        },

        // Code block enhancements
        '& pre': {
          position: 'relative',
        },

        // List enhancements
        '& ul, & ol': {
          marginBottom: '1rem',
        },

        // Blockquote enhancements
        '& blockquote': {
          margin: '1.5rem 0',
        },

        // Table enhancements
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
        },
      }}
      {...props}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};

export default BeautifulMarkdownRenderer;
