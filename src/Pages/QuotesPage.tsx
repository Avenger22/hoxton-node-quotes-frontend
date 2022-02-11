import { useEffect, useState } from "react"
import Quote from "../Components/Quote"

type Quote = {
    id: number,
    author: string,
    quote: string
}

export default function QuotesPage() {

    const [quotes, setQuotes] = useState<Quote[]>([])
    const [quotesSearch, setQuotesSearch] = useState<Quote[]>([])
    
    let term: string = 'life'

    function getQuotesFromServer():void {
        
        fetch(`http://localhost:8000/quotes`)
        .then(resp => resp.json())
        .then(quotesFromServer => setQuotes(quotesFromServer))
    
    }

    function getQuotesSearchFromServer():void {
        
        fetch(`http://localhost:8000/quotes?search=${term}`)
        .then(resp => resp.json())
        .then(quotesSearchFromServer => setQuotesSearch(quotesSearchFromServer))
    
    }

    useEffect(getQuotesFromServer, [])
    useEffect(getQuotesSearchFromServer, [])

    // alert(`enter the search term:`)
    // term = String(prompt("enter the term"))
    // console.log(term)
    console.log(quotesSearch)

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