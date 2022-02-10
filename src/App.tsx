import { useEffect, useState } from 'react'
import './App.css'
import Quote from "./Components/Quote"

type Quote = {
      author: string,
      quote: string
}

function App() {

  const [quotes, setQuotes] = useState<Quote[]>([])

  function getQuotesFromServer():void {
    
    fetch(`http://localhost:8000/quotes`)
      .then(resp => resp.json())
      .then(quotesFromServer => setQuotes(quotesFromServer))
  
  }

  useEffect(getQuotesFromServer, [])

      return (

      <>

            <div className='app'>

                  <ul className='quotes-wrapper'>

                  {

                        quotes.map(item => 
                        
                                    <Quote 
                                          key={item.author}
                                          item = {item}
                                    />
                        
                        )

                  }

                  </ul>
            
            </div>
            
      </>
      
      )

}

export default App