'use client'

import { Container,Box,Paper,Typography, Button}  from "@mui/material"
import { RecipeType } from "../types/recipe"
import { useState } from "react"
import RecipeCard from "../../component/RecipeCard"

const RecipePage =() => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null)

  const fetchRecipe = async():Promise<void> => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    const recipeData = data.meals[0];
    const savedIngredients:string[] = []

    const keys = Object.keys(recipeData).filter(item => item.includes("strIngredient"));

    for(let i=0; i< keys.length; i++) {
      if(recipeData[keys[i]]) {
        savedIngredients.push(
          recipeData[keys[i]] + " - " + recipeData[`strMeasures${i + 1}`])

      }else{
        break;
      }
    }
    console.log(savedIngredients)

    let recipeToSave ={
     name: recipeData.strMeal,
      category: recipeData.strCategory,
      area: recipeData.strArea,
      image:recipeData.strMealThumb,
      video:recipeData.strYoutube,
      instructions: recipeData.strInstructions,
      ingredients: savedIngredients
      
    } 
    setRecipe(recipeToSave)
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
      }}> Dinner Meal</Typography>
      <Button variant="contained" onClick={fetchRecipe}>Find a meal!</Button>
      {recipe && <RecipeCard{...recipe} />}
  </Box></Paper></Container>
    
  )

}
export default RecipePage
