import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/Layout'

function App() {

  return (
    <Router>
      <Routes>
      <Route 
          path="/" 
          element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
