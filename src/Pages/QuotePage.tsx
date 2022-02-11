import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

type Quote = {
    id: number,    
    author: string,
    quote: string
}

export default function QuotePage() {

    const navigate = useNavigate()
    const params = useParams()

    const [quoteItem, setQuoteItem] = useState<Quote | null>(null)
    const [quoteRandomItem, setQuoteRandomItem] = useState<Quote | null>(null)
    const [randomClicked, setRandomClicked] = useState<boolean>(false)

    function getIndividualQuoteFromServer () {

        fetch(`http://localhost:8000/quotes/${params.id}`)
          .then(resp => resp.json())
          .then(quoteFromServer => setQuoteItem(quoteFromServer))
        
    }

    function getIndividualRandomQuoteFromServer () {

        fetch(`http://localhost:8000/random`)
          .then(resp => resp.json())
          .then(quoteRandomFromServer => setQuoteRandomItem(quoteRandomFromServer))
        
    }

    useEffect(getIndividualQuoteFromServer, [])
    useEffect(getIndividualRandomQuoteFromServer, [])

    // if (randomClicked) {
    //     useEffect(getIndividualRandomQuoteFromServer, []) 
    // }

    if (quoteItem === null) {
        return <main>Loading...</main>
    }

    if (quoteItem.author === undefined) {
        return <main>Quote not found</main>
    }

    return (

        <>
        
            <button onClick={function () {
                setRandomClicked(!randomClicked)
                // window.location.reload();
            }}>Get Random</button>

            <div className="single-quote">
                <span>{randomClicked ? quoteRandomItem?.author : quoteItem.author}</span>
                <span>"{randomClicked ? quoteRandomItem?.quote : quoteItem.quote}"</span>
            </div>

            {/* {
                randomClicked ? navigate(`http://localhost:3000/quotes/${quoteRandomItem?.id}`) : null
            } */}

        </>

    )

}