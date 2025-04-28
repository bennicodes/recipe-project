import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Importing pages
import App from "../App";
import AddRecipe from "../pages/AddRecipe/AddRecipe";
import Recipes from "../pages/Recipes/Recipes";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Recipes />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
    </Route>
  )
);
