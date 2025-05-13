"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

//all functins in this file will treated as server actions

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export default async function shareMeal(prevState,formData) {
  // so this function will only execute on the server as to handle the requests

  //1. creting a form object
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size == 0
  ) {
    return {
      message:'invalid input'
    }
  }
  await saveMeal(meal);
  
  //revalidated means throwing away the cache
  revalidatePath('/meals') //tells to revalidate cache which belongs to a certain path by default no nested path will be revalidated but we can do so by adding layouts
 
  redirect("/meals");
}
