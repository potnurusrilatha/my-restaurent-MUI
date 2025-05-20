"use client";

import {  useEffect, useState } from "react";
import { RecipeType } from "@/utils/recipe"; 
import {Card, List, ListItem, Link as MUILink, CardContent, CardMedia, Container,Typography,} from "@mui/material";

//  Fetch the random recipe
const getRandomRecipe = async (): Promise<RecipeType> => {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    const meal = data.meals[0];

    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient.trim()} - ${measure.trim()}`);
      }
    }

    return {
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      image: meal.strMealThumb,
      video: meal.strYoutube,
      instructions: meal.strInstructions,
      ingredients,
    };
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    throw error;
  }
};

// Component to display recipe
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
        <CardMedia component="img" height="400" image={recipe.image} alt={recipe.name} />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {recipe.category} | {recipe.area}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((item, index) => (
          <ListItem key={index} sx={{ pl: 0 }}>
            - {item}
          </ListItem>
          ))}
        </List>


          <Typography variant="h6" sx={{ mt: 2 }}>
            Instructions
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {recipe.instructions}
          </Typography>

          {recipe.video && (
            <Typography sx={{ mt: 2 }}>
              <MUILink href={recipe.video} target="_blank" rel="noopener">
                Watch Video
              </MUILink>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Recipes;
