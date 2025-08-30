import React from 'react';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import BeautifulMarkdownRenderer from './BeautifulMarkdownRenderer';

const TestBeautifulMarkdown = () => {
  const sampleMarkdown = `# 🎉 Beautiful Markdown Test! 🎉

## ✨ Features Showcase

This is a **bold text** and this is *italic text*. Here's some \`inline code\` for you!

### 🌟 Code Blocks

\`\`\`javascript
const love = {
  is: "beautiful",
  grows: "every day",
  forever: true
};

console.log("I love you! ❤️");
\`\`\`

### 📝 Lists

**Unordered List:**
- First item with **bold text**
- Second item with *italic text*
- Third item with \`code\`

**Ordered List:**
1. First step
2. Second step
3. Third step

### 💬 Blockquotes

> "This is a beautiful blockquote that showcases the enhanced styling and animations."

### 📊 Tables

| Feature | Status | Rating |
|---------|--------|--------|
| Typography | ✅ | ⭐⭐⭐⭐⭐ |
| Code Highlighting | ✅ | ⭐⭐⭐⭐⭐ |
| Dark Mode | ✅ | ⭐⭐⭐⭐⭐ |
| Animations | ✅ | ⭐⭐⭐⭐⭐ |

### 🔗 Links

Here's a [link to Google](https://google.com) and another [internal link](#features-showcase).

### 🖼️ Images

![Celebration](https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Beautiful+Image)

---

## 🎨 What Makes This Special

- **Gradient headings** with animated colors
- **Syntax highlighting** for code blocks
- **Custom styling** for every element
- **Dark mode support** with theme integration
- **Smooth animations** and hover effects
- **Responsive design** for all devices

*This markdown renderer transforms plain text into beautiful, engaging content!*`;

  return (
    <Box py={8} px={4}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Heading
            textAlign="center"
            bgGradient="linear(to-r, psyduck.500, duck.500)"
            bgClip="text"
            size="2xl"
          >
            🎨 Beautiful Markdown Renderer Test
          </Heading>

          <Box
            border="2px"
            borderColor="psyduck.200"
            borderRadius="xl"
            p={6}
            shadow="xl"
          >
            <BeautifulMarkdownRenderer>
              {sampleMarkdown}
            </BeautifulMarkdownRenderer>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TestBeautifulMarkdown;
