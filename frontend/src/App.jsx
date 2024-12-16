import "./index.css";
import { useContext, Suspense, lazy } from "react";
import { ProductContext } from "./contexts/ProductContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Announcement from "./components/Announcement/Announcement";
import Loading from "./components/Loading/Loading";
// Load non-critical components with lazy loading
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

function App() {
  const { isLoading } = useContext(ProductContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-hidden">
      <Router>
        <Announcement />
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Sidebar />
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
