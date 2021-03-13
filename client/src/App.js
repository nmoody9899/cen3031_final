import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SideDrawer from "./components/drawer/SideDrawer";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/FogotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
//different pages for admin navigation
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import BrandCreate from "./pages/admin/brand/BrandCreate";
import BrandUpdate from "./pages/admin/brand/BrandUpdate";
import FormOrTypeCreate from "./pages/admin/formortype/FormOrTypeCreate";
import FormOrTypeUpdate from "./pages/admin/formortype/FormOrTypeUpdate";
import UnitOfMeasureCreate from "./pages/admin/unitofmeasure/UnitOfMeasureCreate";
import UnitOfMeasureUpdate from "./pages/admin/unitofmeasure/UnitOfMeasureUpdate";
import SubCategoryCreate from "./pages/admin/subcategory/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/subcategory/SubCategoryUpdate";

import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";

import IngredientCreate from "./pages/admin/ingredient/IngredientCreate";
import IngredientUpdate from "./pages/admin/ingredient/IngredientUpdate";
import AllIngredients from "./pages/admin/ingredient/AllIngredients";
import Ingredient from "./pages/ingredient/Ingredient";

import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/subcategory/SubCategoryHome";
import BrandHome from "./pages/brand/BrandHome";

//Shop
import Shop from "./pages/Shop";

//Cart
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

//for navigation from ant Header
import Header from "./components/nav/Header";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  //to check the firebase auth state; this
  //loads wheneverever component mounts or state change happens
  //useEffect takes a function and dependency array as arguments
  useEffect(() => {
    //dispatch user information to redux store
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //if we have user get user's token -> access protected routes later
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        //dispatch token to redux store (make sure you send all the user fields you need!!)
        // dispatch({
        //   //expecting type and payload
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     email: user.email,
        //     token: idTokenResult.token,
        //   },
        // });

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              //expecting type and payload
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    //cleanup

    return () => unsubscribe();
  }, [dispatch]);

  return (
    //this is wrapped in index.js with BrowserRouter
    <React.Fragment>
      <Header />
      <SideDrawer />
      <ToastContainer />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug" //slug of category comes from url
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/brand" component={BrandCreate} />
        <AdminRoute
          exact
          path="/admin/brand/:slug" //slug of category comes from url
          component={BrandUpdate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory"
          component={SubCategoryCreate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory/:slug" //slug of category comes from url
          component={SubCategoryUpdate}
        />
        <AdminRoute
          exact
          path="/admin/formortype"
          component={FormOrTypeCreate}
        />
        <AdminRoute
          exact
          path="/admin/formortype/:slug" //slug of category comes from url
          component={FormOrTypeUpdate}
        />
        <AdminRoute
          exact
          path="/admin/unitofmeasure"
          component={UnitOfMeasureCreate}
        />
        <AdminRoute
          exact
          path="/admin/unitofmeasure/:slug" //slug of category comes from url
          component={UnitOfMeasureUpdate}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/ingredient"
          component={IngredientCreate}
        />
        <AdminRoute
          exact
          path="/admin/ingredients"
          component={AllIngredients}
        />
        <AdminRoute
          exact
          path="/admin/ingredient/:slug" //slug of category comes from url
          component={IngredientUpdate}
        />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/ingredient/:slug" component={Ingredient} />
        <Route exact path="/subcategory/:slug" component={SubCategoryHome} />
        <Route exact path="/brand/:slug" component={BrandHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        {/* {Right now the checkout process is guarded here and on the Cart/Checkout page with user ?, but we can remove this so anyone can checkout} */}
        <UserRoute exact path="/checkout" component={Checkout} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
