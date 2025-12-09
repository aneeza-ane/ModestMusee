import Categories from "../Components/Categories"
import Footer from "../Components/Footer"
import HeroSection from "../Components/HeroSection"
import Navigation from "../Components/Navigation"
import ProductPages from "../Pages/ProductsPage"

function LandingPage()
{
    return <>
   <Navigation/>
    <HeroSection/>
    <Categories/>
    <ProductPages/>
    <Footer/>
    </> 
}
export default LandingPage;