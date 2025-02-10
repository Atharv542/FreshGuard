import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MyItems from './pages/MyItems';

import Header from './pages/Header';
import Recipe from './pages/Recipe.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home />
            </div>
          }
        />
        
        {/* MyItems Route */}
        <Route
          path="/myItems"
          element={
            <div>
              <Header />
              <MyItems />
            </div>
          }
        />
        <Route
          path="/view-recipe"
          element={
            <div>
              <Header />
              <Recipe />
            </div>
          }
        />

        {/* Auth Routes */}
        <Route path="/register"   element={
            <div>

              <Register/>
            </div>
          } />
        <Route path="/login" element={
            <div>
              
              <Login/>
            </div>
          } />
      </Routes>
    </>
  );
}

export default App;

