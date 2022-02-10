import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import QuotePage from './Pages/QuotePage'
import QuotesPage from './Pages/QuotesPage'

function App() {

      return (

            <>

                  <Routes>

                        <Route 
                              index 
                              element={<Navigate replace to="/quotes" />} 
                        />

                        <Route 
                              path = "/quotes" 
                              element = {<QuotesPage />}>
                        </Route>

                        <Route 
                              path = "/quotes/:author" 
                              element = {<QuotePage />}>
                        </Route>

                  </Routes>
            
            </>
      
      )

}

export default App