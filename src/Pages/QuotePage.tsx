import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type Quote = {
    author: string,
    quote: string
}

export default function QuotePage() {

    const params = useParams()
    const [quoteItem, setQuoteItem] = useState<Quote | null>(null)

    function getIndividualQuoteFromServer () {

        fetch(`http://localhost:8000/quotes/${params.author}`)
          .then(resp => resp.json())
          .then(quoteFromServer => setQuoteItem(quoteFromServer))
        
    }
    
    useEffect(getIndividualQuoteFromServer, [])

    if (quoteItem === null) {
        return <main>Loading...</main>
    }

    if (quoteItem.author === undefined) {
        return <main>Quote not found</main>
    }

    return (

        <>
        
            <div className="single-quote">
                <span>{quoteItem.author}</span>
                <span>"{quoteItem.quote}"</span>
            </div>

        </>

    )

}