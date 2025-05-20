import { Button,Container, Typography, Paper, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styled from '@emotion/styled';

export default function Home() {
  const styled = {
    mainContent: {
    color: "#ff0000",
    backgroundColor: "#ffff00",
    textAlign: "center",
    p: 3
  },
  secondaryContent: {
    color: "#0000ff",
    
   m: 3,
    p: 3 ,
  }
  }
  return (  
    
    <Container sx={{
       mt:4
       }}
        maxWidth="sm">
      <Paper elevation={12}>
        <Box sx={{
         p: 2,
         textAlign: 'center',
         backgroundColor: 'yellowgreen' }}>
      <Typography variant="h1" color="error" gutterBottom
      sx={{
        fontsize: {
          xs: "3rem",
          sm: "4rem"
        }
      }}> welcome to sree's Resturent</Typography>
      <Typography sx={{
        fontSize: {
          xs: "1rem",
          sm: "2rem"
        }
          
      }} variant="h2" >All the menu available</Typography>
       
      <Button startIcon ={<RestaurantIcon />} variant="contained" color="primary">
        Order Now
      </Button>
      </Box>
     </Paper>
   </Container> 
   
  );
}
