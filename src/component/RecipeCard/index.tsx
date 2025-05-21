import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import { TabContext } from '@mui/lab';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';


// Update the import path below to the correct relative path where RecipeType is defined.
// For example, if RecipeType is in src/types/recipe.ts, use:
import { RecipeType } from "@/utils/recipe"
// If the file does not exist, create it and define RecipeType there.
 import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ListItem } from '@mui/material';

 

 
export default function RecipeReviewCard({name, image, category, area, ingredients, video, instructions}:RecipeType) {
   

  const [value, setValue] = React.useState('1');
 
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  const embedVideo = (video:string):string => {
    return video.replace("watch?v=" , "embed/")
  }
 
  return (

    <Card elevation={12} sx={{ maxWidth: "sm" , my:4}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "seashell",color: "brown" }} aria-label="recipe">
          SP
          </Avatar>
        }
       
        title={name}
        subheader={`${category} - ${area}`}
      />
      <CardMedia
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
          <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Ingredients" value="1" />
              <Tab label="Instructions" value="2" />
              <Tab label="Media" value="3" />
            </TabList>
          </Box>
        <TabPanel value="1">{ingredients.map((item:string, index:number) => <p key={index}>{item}</p>)}</TabPanel>
        <TabPanel sx={{
           whiteSpace:"pre-wrap"}} value="2">{instructions}</TabPanel>
    <TabPanel value="3">{embedVideo(video)}</TabPanel>
  </TabContext>
</Box>
      </CardContent>
    </Card>
  );
}