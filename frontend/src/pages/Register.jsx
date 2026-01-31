import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
  MenuItem,
  Link
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
            <PersonAddIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Create Account
          </Typography>

          <Box component="form" sx={{ mt: 3, width: "100%" }}>
            <TextField fullWidth label="Full Name" margin="normal" required />

            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
            />

            <TextField
              select
              fullWidth
              label="Role"
              margin="normal"
              defaultValue="student"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="counselor">Counselor</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Register
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
