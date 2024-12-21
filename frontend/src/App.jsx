import "./index.css";
import { useContext, Suspense, lazy } from "react";
import { ProductContext } from "./contexts/ProductContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Announcement from "./components/Announcement/Announcement";
import Loading from "./components/Loading/Loading";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./components/Payment/Payment";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
// Load non-critical components with lazy loading
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const EditProfile = lazy(() => import("./components/Profile/EditProfile"));

function App() {
  const { isLoading } = useContext(ProductContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthProvider>
      <div className="overflow-hidden">
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />
              </Routes>
              <Sidebar />
            </main>
            <Footer />
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
