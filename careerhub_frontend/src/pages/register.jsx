import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Box,
  Breadcrumbs,
  Link 
} from '@mui/material';
import { GitHub, Google } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { toast } from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    toast.success('Account created successfully!');
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4, pb: 8 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 4 }}
      >
        <Link href="/" color="inherit">Home</Link>
        <Typography color="text.primary">Create Account</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Logo/Avatar Section */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography variant="h3" component="div" sx={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            R
          </Typography>
        </Box>

        <Typography variant="h5" textAlign="center" gutterBottom>
          Create a Resend account
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={4}>
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Create account
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GitHub />}
            onClick={() => toast.loading('Connecting to GitHub...')}
          >
            Sign up with GitHub
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={() => toast.loading('Connecting to Google...')}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => toast.loading('Connecting to SSO...')}
          >
            Sign up with SSO
          </Button>
        </Box>

        <Typography variant="caption" textAlign="center" color="text.secondary" sx={{ mt: 4, display: 'block' }}>
          By signing up, you agree to our{' '}
          <Link href="#">terms</Link>,{' '}
          <Link href="#">acceptable use</Link>, and{' '}
          <Link href="#">privacy policy</Link>.
        </Typography>
      </Paper>
    </Container>
  );
} 