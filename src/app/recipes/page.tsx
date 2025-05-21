"use client";

import {  useEffect, useState } from "react";
import { RecipeType } from "@/utils/recipe"; 
import {Card, List, ListItem, Link as MUILink, CardContent, CardMedia, Container,Typography,} from "@mui/material";


const getRandomRecipe = async (): Promise<RecipeType> => {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    const meals = data.meals[0];

    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meals[`strIngredient${i}`];
      const measure = meals[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient.trim()} - ${measure?.trim() ?? ''}`);
      }
    }

    return {
      name: meals.strMeal,
      category: meals.strCategory,
      area: meals.strArea,
      image: meals.strMealThumb,
      video: meals.strYoutube,
      instructions: meals.strInstructions,
      ingredients,
    };
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    throw error;
  }
};

const Recipes = () => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomRecipe();
      setRecipe(data);
    };
    fetchData();
  }, []);

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        
        <CardContent>
          <Typography variant="h4" gutterBottom  sx={{ color: '#ff5722' }}>
            Name:{recipe.name}
          </Typography>
          <Typography color="text.secondary" sx={{ mt:2, fontSize: 14, fontWeight: 'bold', color: '#3f51b5' }}>
            Category: {recipe.category} 
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#3f51b5' }}>Area: {recipe.area}</Typography>
          <CardMedia 
        component="img" 
        height="400" 
        image={recipe.image} 
        alt={recipe.name} />

          <Typography variant="h4" sx={{ mt: 2, color: '#f50057' }} >
            Ingredients
          </Typography>
          {/* <List>
            {recipe.ingredients.map((item, index) => (
          <ListItem key={index} sx={{ pl: 0 }}>
            - {item}
          </ListItem>
          ))}
        </List> */}
          <Typography variant="body2" sx={{ mt:2 }} gutterBottom>
            {recipe.ingredients}
          </Typography>

          <Typography variant="h4" sx={{ mt: 2,  color: '#4caf50'}}>
            Instructions
          </Typography>
          <Typography variant="body1" sx={{ mt: 1,fontSize: 16, fontWeight: 'bold', color: '#212121' }}>
            {recipe.instructions}
          </Typography>

          {recipe.video && (
            <Typography sx={{ mt: 2, color: '#ffeb3b', fontWeight: 'bold', }}>
              <MUILink href={recipe.video} target="_blank" rel="noopener">
               Video: Watch Video
              </MUILink>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Recipes;
