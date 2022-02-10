import { useEffect, useState } from "react"
import Quote from "../Components/Quote"

type Quote = {
    author: string,
    quote: string
}

export default function QuotesPage() {

    const [quotes, setQuotes] = useState<Quote[]>([])

    function getQuotesFromServer():void {
        
        fetch(`http://localhost:8000/quotes`)
        .then(resp => resp.json())
        .then(quotesFromServer => setQuotes(quotesFromServer))
    
    }

    useEffect(getQuotesFromServer, [])

    return (

        <>

            <h1>Quotes from Backend server</h1>

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
            
        </>

    )

}