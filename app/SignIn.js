'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider} from '../firebase'; // Ensure this path points to your firebase configuration
import { blue, lightBlue } from '@mui/material/colors';

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
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: 'lavender',
      }}
    >
      <box id="boxx">
      <box id="box"></box><br></br>
      <box id="box1"></box><br></br>
      </box>
      <h1 id="heading">WELCOME TO VETPET AI SUPPORT</h1>
      <p>"Bringing Veterinary Care to Your Fingertips"</p>
      <Typography variant="h4" style={{ color: 'black' }} gutterBottom>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ backgroundColor: 'white', color: 'black', width: 400 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: 'white', color: 'black', width: 400 }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          backgroundColor: lightBlue[500],
          color: 'black',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoogleSignIn}
        sx={{ marginTop: 2, backgroundColor: 'purple', color: 'white' }}
      >
        Sign In with Google
      </Button>
     
      <Button
        variant="text"
        color="secondary"
        onClick={() => setIsSignUp(!isSignUp)}
        sx={{ marginTop: 2, color: blue[500] }}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  );
}