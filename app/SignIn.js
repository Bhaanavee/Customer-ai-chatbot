'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Stack } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider} from '../firebase'; // Ensure this path points to your firebase configuration
import './style.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign in and sign up

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in:', userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed up:', userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
    } catch (error) {
      setError(error.message);
    }
  };

 

  const handleSubmit = async () => {
    if (isSignUp) {
      await handleSignUp();
    } else {
      await handleSignIn();
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ minHeight: '100vh', paddingBottom: '20px' }} // Adjust minHeight and padding
      backgroundColor='#121212'
    >
      <br></br>
      <br></br>
      <h1 id="heading" style={{ color: '#00804f' }}>WELCOME TO PAWTOPIA</h1>
      <h4 style={{ color: '#00804f' }}>Bringing Veterinary Care to Your Fingertips</h4>
      <br>
      </br>
      <Stack
          direction={'row'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
      <box id="boxx">
      <box id="box"></box><br></br>
      
      </box>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          bgcolor: '#181818',
        }}
      >
      <Typography variant="h4" style={{ color: '#00804f', fontSize: "1.5rem", fontFamily: 'Times New Roman', fontWeight: '900' }}>
        {isSignUp ? 'SIGN UP' : 'SIGN IN'}
      </Typography>
      <br></br>
      <TextField
        label="Email"
        type="email"
        value={email}
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

        onChange={(e) => setEmail(e.target.value)}
        sx={{ backgroundColor: '#181818', color: '#00804f', width: 300 ,
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
      <TextField
        label="Password"
        type="password"
        value={password}
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

        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: '#181818', color: '#005233', width: 300,
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br></br>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#005233",
          color: 'white',
          '&:hover': {
            backgroundColor: '#08b774', // Optional: slightly darker shade for hover effect
          },
          
        }}
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button
        variant="contained"
        
        onClick={handleGoogleSignIn}
        sx={{ marginTop: 2, backgroundColor: '#005233', color: 'white',
          '&:hover': {
            backgroundColor: '#08b774', // Optional: slightly darker shade for hover effect
          },
         }}
      >
        Sign In with Google
      </Button>

      <Button
        variant="text"
        
        onClick={() => setIsSignUp(!isSignUp)}
        sx={{ marginTop: 2, color: '#08b774',
          '&:hover': {
            backgroundColor: '#005233', // Optional: slightly darker shade for hover effect
          },
         }}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Button>
      </Paper>
      
      <box id="box1"></box><br></br>
      </Stack>
    </Box>
    
  );
  
}
// const Footer = () => (
//   <Box
//     component="footer"
//     width="100%"
//     bgcolor="#f0f0f0"
//     p={3}
//     mt={4}
//     textAlign="center"
//   >
//     <Typography variant="h6" gutterBottom>
//       Our Team
//     </Typography>
//     <Grid container spacing={2} justifyContent="center">
//       <Grid item xs={12} sm={4}>
//         <Typography variant="subtitle1">John Doe</Typography>
//         <Typography variant="body2">Founder & CEO</Typography>
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <Typography variant="subtitle1">Jane Smith</Typography>
//         <Typography variant="body2">Chief Technology Officer</Typography>
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <Typography variant="subtitle1">Emily Brown</Typography>
//         <Typography variant="body2">Lead Veterinary Specialist</Typography>
//       </Grid>
//     </Grid>
//     <Typography variant="body2" color="textSecondary" mt={2}>
//       &copy; {new Date().getFullYear()} Pawtopia AI Support. All rights reserved.
//     </Typography>
//   </Box>
// );