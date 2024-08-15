'use client';

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from '../firebase.js';
import SignIn from './SignIn.js'; // Assuming your SignIn component is in the app folder

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Pawtopia support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);  // Track the authenticated user
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);  // Clear the user state after sign out
    } catch (error) {
      console.error('Sign out error:', error);
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
  }, [messages]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#121212' }} // Spotify black background
    >

    <br></br>
      <Box
        sx={{
          backgroundColor: '#005233', // Spotify neon green for header
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
          textAlign: "center",
          boxShadow: 4,
        }}
      >
        
        <h2 style={{ color: "white", marginBottom: "10px" }}>
          PAWTOPIA AI SUPPORT
        </h2>
      </Box>
      <Button variant="outlined" onClick={handleSignOut}
          sx={{
              color: '#005233',
              borderColor: '#005233',
              '&:hover': {
                backgroundColor: '#005233',
                color: '#121212',
              },
            }}>
            SIGN OUT
          </Button>
          <br></br>
  
      <Stack
        direction='column'
        width="60vw"
        height="700px"
        border="1px solid #005233"
        overflow="auto"
        p={2}
        spacing={3}
        sx={{ backgroundColor: '#181818' }} // Darker chat background
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
                    ? '#005233'  // Assistant messages in Spotify neon green
                    : '#282828'  // User messages in dark grey
                }
                color={message.role === 'assistant' ? 'white' : 'white'} // Text color
                borderRadius={16}
                p={3}
                boxShadow={2}
                sx={{ whiteSpace: 'pre-wrap' }}
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
                color: 'white',  // Text color in Spotify neon green
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#005233',  // Label color in Spotify neon green
              },
            }}
            sx={{
              bgcolor: '#282828',  // Input background in dark grey
              borderRadius: '4px',
              '& .MuiInputBase-root': {
                '&:focus-within': {
                  borderColor: '#005233',  // Green border color when focused
                  boxShadow: `0 0 0 2px rgba(0, 82, 51, 0.3)`  // Optional glow effect
                }
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#005233',  // Green color for the label when focused
                }
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#005233',  // Default border color in green
                },
                '&:hover fieldset': {
                  borderColor: '#005233',  // Green border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#005233',  // Green border color when focused
                }
              }
            }}
          />
          <Button
            variant="outlined"
            onClick={sendMessage}
            disabled={isLoading}
            sx={{
              color: '#005233',
              borderColor: '#005233',
              '&:hover': {
                backgroundColor: '#005233',
                color: '#121212',
              },
            }}
          >
            SEND
          </Button>
          
        </Stack>
      </Stack>
      <br></br>
    </Box>
  )
  
}