import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./User/Pages/LandingPage";
import Login from "./User/Pages/Login";
import Signup from "./User/Pages/Signup";
import ContactUs from "./User/Pages/ContactUs";
import AboutUs from "./User/Pages/Aboutus";
import ProductsDisplay from "./User/Pages/ProductsDisplay";
import AdminLogin from "./Admin/Pages/AdminLogin";
import UpdateItem from "./Admin/Pages/UpdateItem"
import AddItem from "./Admin/Pages/AddItem"
import ViewItems from "./Admin/Pages/ViewItems"
import ManageItems from "./Admin/Pages/ManageItems"
import Checkout from "./User/Pages/Checkout";
import Success from "./User/Pages/Success";
import ProductDescription from "./User/Pages/ProductDescription";
import Dashboard from "./Admin/Pages/Dashboard";
import CartPage from "./User/Pages/Cart";
import ProfilePage from "./User/Pages/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login/> },
  { path: "/signup", element: <Signup/> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/products/:category", element: <ProductsDisplay/> },
  { path: "/product/:id", element: <ProductDescription /> },
  { path: "/admin/login", element: <AdminLogin/> },
  { path: "/admin/dashboard", element: <Dashboard/> },
  { path: "/admin/addItem", element: <AddItem /> },
  { path: "/admin/updateItem/:id", element: <UpdateItem /> },
  { path: "/admin/viewItem", element: <ViewItems /> },
  { path: "/admin/manageItems", element: <ManageItems/>},
  { path: "/checkout", element: <Checkout/>},
  { path: "/success", element: <Success/>},
  { path: "/cart", element: <CartPage/>},
  { path: "/profile", element: <ProfilePage/>}
]);

export default router;
