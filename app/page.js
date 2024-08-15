'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the PetVet support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;  // Don't send empty messages
    setIsLoading(true)
    const newMessage = { role: "user", content: message };  // Store the current message
    // Clear input field

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
      { role: 'assistant', content: '' },
    ]);
    setMessage('')  
  
    try {
      const response = await fetch('/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const assistantResponse =
        data.message ||
        "Apologies, I'm unable to process your request at this time.";

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { role: "assistant", content: assistantResponse },
        ]);

    } catch (error) {
      console.error('Error:', error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', 
          content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false)
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  
  // Auto scrolling
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <br></br>
      <Box
          sx={{
            backgroundColor: "purple", // Solid dark green for header
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <h1 style={{ color: "whitesmoke", marginBottom: "10px" }}>
            PetVet AI Support
          </h1>
        
        </Box>
      
      <Stack
        direction='column'
        width="60vw"
        height="700px"
        border="1px white"
        overflow="auto"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            InputProps={{
              sx: {
                color: 'white',  // Change this to your desired text color
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#16abff33',  // Change this to your desired label color
              },
            }}
          />
          <Button variant="outlined" onClick={sendMessage} disabled={isLoading}>
            SEND
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
