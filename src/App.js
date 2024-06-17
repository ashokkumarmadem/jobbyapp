import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/Login'

import Home from './components/Home'
import NotFound from './components/NotFound'

import Jobs from './components/Jobs'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

// Replace your code here
const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
