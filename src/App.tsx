import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/Layout'
import { Provider } from 'react-redux'
import store from './app/store'
import Test1 from './pages/Test1'
import Test3 from './pages/Test3'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route 
          path="/" 
          element={<Layout><Home /></Layout>} 
        />
        <Route 
          path="/test1" 
          element={<Layout><Test1 /></Layout>} 
        />
        <Route 
          path="/test3" 
          element={<Layout><Test3 /></Layout>} 
        />
        <Route 
          path="*" 
          element={<Layout><Home /></Layout>} 
        />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
