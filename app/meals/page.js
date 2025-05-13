import React, { Suspense } from 'react'
import classes from './page.module.css'
import Link from 'next/link'
import MealsGird from '../components/meals/meals-grid'
import { getMeals } from '@/lib/meals'

export const metadata = {
  title: 'All meals',
  description: 'Browse the Delicious meals, shared by a food-loving community.',
};

async function Meals(){
  const meals=await getMeals()
  return <MealsGird meals={meals}/>
}


const page = () => {

  return (
    <>
    <header className={classes.header}>
      <h1>Delicious Meals created <span className={classes.highlight}> by you</span></h1>
      <p>Choose your facourite recipie and cook it yourself</p>
      <p className={classes.cta}>
        <Link href="/meals/share">
        Share your fav recipie
        </Link>
      </p>
    </header>
    <main className={classes.main}>
      <Suspense fallback={<p className={classes.loading}>Fetching Meals.....</p>}>
      <Meals/>
      </Suspense>
    </main>
    </>
  )
}

export default page