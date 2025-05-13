import sql from "better-sqlite3";
import slugify from "slugify";
import fs from "node:fs";
import xss from "xss";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("loading meals failed")
  return db.prepare("SELECT * FROM meals").all(); // fetching all the data
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug= ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); //sanitizing and cleaning the instructions as they maybe harmful

  //get extrension of uploaded image
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("saving image failed");
    }
  });

  //overriting the meal.image with path of the file(image)
  meal.image = `/images/${fileName}`;

  //save it to database
  db.prepare(`
      INSERT INTO meals
      (title,summary,instructions,creator,creator_email,image,slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
         )
      `).run(meal);
}
