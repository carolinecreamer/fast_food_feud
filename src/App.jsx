import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import Chip from "./components/Chip/Chip.jsx"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel.jsx"
import { createDataSet } from "./data/dataset"
import "./App.css"
import { useState } from "react"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  const [category, setCategory] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [selected, setSelected] = useState("");

  let currentMenuItems = data.filter((item)=>item.food_category === category && item.restaurant === restaurant)
  let obj = currentMenuItems.find((item)=>item.item_name === selected)
  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
            <ul className="container">
              {categories.map((item, idx) =>
                <Chip key={idx} label={item} isActive={category === item ? true : false} onClick={setCategory}></Chip>
              )}
              </ul>
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {/* HEADER GOES HERE */}
        <Header header={appInfo} />

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">
            <ul className="categories">
              {restaurants.map((item, idx) =>
                <Chip key={idx} label={item} isActive={restaurant === item ? true : false} onClick={setRestaurant}></Chip>
              )}
            </ul>
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={appInfo.instructions}/>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            <ul className="menu options">
              {currentMenuItems.map((item, idx) =>
                <Chip key={idx} label={item.item_name} isActive={selected === item.item_name ? true : false} onClick={setSelected}></Chip>
              )}
            </ul>
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
            <NutritionalLabel key="nutritionLabel" item={obj}/>
          </div>
        </div>

        <div className="data-sources">
          <div><p>{appInfo.dataSource}</p></div>
        </div>
      </div>
    </main>
  )
}

export default App
