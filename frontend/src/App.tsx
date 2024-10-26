import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login_logout/LoginPage';
import RegistrationPage from './components/registration/RegistrationPage';
import HomePage from './components/home/HomePage';
import Footer from './components/layout/Footer';
import HomeDivider from './components/layout/HomeDivider';
import CartPage from './components/cart/CartPage';
import Dashboard from './components/user/Dashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UnprotectedRoute from './components/layout/UnprotectedRoute';
import VerifyEmail from './components/registration/VerifyEmail';
import ProductPage from './components/product/ProductPage';
import CollectionsPage from './components/categories/CollectionsPage';
import RequestNewPassPage from './components/login_logout/RequestNewPassPage';
import ResetPassPage from './components/login_logout/ResetPassPage';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/:collectionHandle/"
          element={
            <>
              <div className='flex flex-col justify-center min-h-screen'>
                <CollectionsPage />
                <HomeDivider />
                <div className='w-full flex justify-center mt-20'>
                  <div className='w-full max-w-screen-xl px-16'>
                    <Footer />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route 
          path="/:collectionHandle/:productId"
          element={
            <>
              <div className='flex flex-col justify-center min-h-screen'>
                <ProductPage />
                <HomeDivider />
                <div className='w-full flex justify-center mt-20'>
                  <div className='w-full max-w-screen-xl px-16'>
                    <Footer />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route 
          path="/login"
          element={
            <UnprotectedRoute>
              <>
                <div className='flex flex-col justify-center min-h-screen'>
                  <LoginPage />
                  <HomeDivider />
                  <div className='w-full flex justify-center mt-20'>
                    <div className='w-full max-w-screen-xl px-16'>
                      <Footer />
                    </div>
                  </div>
                </div>
              </>
            </UnprotectedRoute>
          }
        />
        <Route 
          path="/cart"
          element={
            <>
              <div className='flex flex-col justify-center min-h-screen'>
                <CartPage />
                <HomeDivider />
                <div className='w-full flex justify-center mt-20'>
                  <div className='w-full max-w-screen-xl px-16'>
                    <Footer />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route 
          path="/register"
          element={
            <>
              <UnprotectedRoute>
                <div className='flex flex-col justify-center min-h-screen'>
                  <RegistrationPage />
                  <HomeDivider />
                  <div className='w-full flex justify-center mt-20'>
                    <div className='w-full max-w-screen-xl px-16'>
                      <Footer />
                    </div>
                  </div>
                </div>
              </UnprotectedRoute>
            </>
          }
        />
        <Route 
          path="/" 
          element={
            <>
              <div className='flex flex-col justify-center'>
                <HomePage />
                <HomeDivider />
              </div>
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-xl px-16'>
                  <Footer />
                </div>
              </div>
            </>
          } 
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Dashboard />
              <HomeDivider />
              <div className='w-full flex justify-center mt-20'>
                <div className='w-full max-w-screen-xl px-16'>
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/request-new-password"
          element={
            <>
              <UnprotectedRoute>
                <div className='flex flex-col justify-center min-h-screen'>
                  <RequestNewPassPage />
                  <HomeDivider />
                  <div className='w-full flex justify-center mt-20'>
                    <div className='w-full max-w-screen-xl px-16'>
                      <Footer />
                    </div>
                  </div>
                </div>
              </UnprotectedRoute>
            </>
          }
        />
        <Route 
          path="/reset-password/:token"
          element={
            <>
              <UnprotectedRoute>
                <div className='flex flex-col justify-center min-h-screen'>
                  <ResetPassPage />
                  <HomeDivider />
                  <div className='w-full flex justify-center mt-20'>
                    <div className='w-full max-w-screen-xl px-16'>
                      <Footer />
                    </div>
                  </div>
                </div>
              </UnprotectedRoute>
            </>
          }
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;



