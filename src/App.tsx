import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/Layout'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route 
            path="/" 
            element={<Layout><Home /></Layout>} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
