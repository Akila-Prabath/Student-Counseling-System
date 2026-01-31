import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Box sx={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        py: 8
      }}>
        <Container>
          <Typography variant="h3" gutterBottom>
            Begin Your Inner Peace Journey
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Expert counseling & holistic mental health support for your wellbeing.
          </Typography>
          <Button variant="contained" sx={{ mt: 3 }}>
            Our Services
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {[
            "Individual Therapy",
            "Couples Counseling",
            "Stress Management",
            "Career Counseling",
          ].map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service}>
              <Card elevation={3}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{service}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: "#e8f0fe", py: 4 }}>
        <Container>
          <Grid container spacing={4}>
            {[
              { label: "Happy Clients", value: "6350+" },
              { label: "Successful Therapy", value: "3200+" },
              { label: "Years Experience", value: "20+" },
              { label: "Experts", value: "15+" },
            ].map((item) => (
              <Grid item xs={6} sm={3} key={item.label}>
                <Typography variant="h5" align="center">
                  {item.value}
                </Typography>
                <Typography align="center">{item.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Meet Our Therapists
        </Typography>
        <Grid container spacing={4}>
          {["J. Mussman", "S. Jenkins", "M. Taylor", "N. Anderson"].map((name) => (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <Box textAlign="center">
                <Avatar sx={{ width: 100, height: 100, mx: "auto" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {name}
                </Typography>
                <Typography color="textSecondary">Therapist</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pricing Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Pricing Plans
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Starter", price: "$150 / session" },
            { title: "Standard", price: "$180 / session" },
            { title: "Premium", price: "$220 / session" },
          ].map((plan) => (
            <Grid item xs={12} sm={4} key={plan.title}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{plan.title}</Typography>
                  <Typography variant="subtitle1" color="primary">
                    {plan.price}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="outlined">
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact CTA */}
      <Box sx={{ backgroundColor: "#f5f5f5", py: 6, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Have Questions?
        </Typography>
        <Button variant="contained">Contact Us</Button>
      </Box>
    </>
  );
};

export default Home;
