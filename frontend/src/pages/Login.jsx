import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Link,
  Paper
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Student Login
          </Typography>

          <Box component="form" sx={{ mt: 3, width: "100%" }}>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Don’t have an account?{" "}
              <Link component={RouterLink} to="/register">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
