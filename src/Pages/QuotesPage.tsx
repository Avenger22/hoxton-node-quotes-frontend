import { useEffect, useState } from "react"
import Quote from "../Components/Quote"

type Quote = {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    avatar: string,
    quote: string
}

export default function QuotesPage() {

    const [quotes, setQuotes] = useState<Quote[]>([])

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [quote, setQuote] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')
    const [age, setAge] = useState<number>(0)

    const [formQuote, setFormQuote] = useState<Quote | null>(null)
    const [quotesSearch, setQuotesSearch] = useState<Quote[]>([])
    
    let term: string = 'life'

    function handleFirstNameChange(e:any) {
        const firstName = e.target.value
        setFirstName(firstName)
    }

    function handleLastNameChange(e:any) {
        const lastName = e.target.value
        setLastName(lastName)
    }

    function handleQuoteChange(e:any) {
        const quote = e.target.value
        setQuote(quote)
    }

    function handleAvatarChange(e:any) {
        const avatar = e.target.value
        setAvatar(avatar)
    }

    function handleAgeChange(e:any) {
        const age = e.target.value
        setAge(age)
    }
    
    function handleFormSubmit(e:any) {

        const newQuoteObject:Quote = {
            id: 13,
            firstName: firstName,
            lastName: lastName,
            age: age,
            quote: quote,
            avatar: avatar
        }

        setFormQuote(newQuoteObject)
        
    }

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

    console.log(quotesSearch)

    return (

        <>

            <h1>Quotes from Backend server</h1>

            <ul className='quotes-wrapper'>

                {

                    quotes.map(item => 
                    
                        <Quote 
                            key={item.id}
                            item = {item}
                        />
                    
                    )

                }

            </ul>

            <form className="form-quotes" onSubmit={function (e) {
                handleFormSubmit(e)
            }}>

                <input name="first-name" defaultValue={firstName} type="text" placeholder="Enter first name: " 
                onChange={(e) => {
                    handleFirstNameChange(e)
                }}></input>

                <input name="last-name" defaultValue={lastName} type="text" placeholder="Enter last name: " 
                onChange={(e) => {
                    handleLastNameChange(e)
                }}></input>

                <input name="quote" defaultValue={quote} type="text" placeholder="Enter quote: " 
                onChange={(e) => {
                    handleQuoteChange(e)
                }}></input>

                <input name="avatar" defaultValue={avatar} type="text" placeholder="Enter avatar: " 
                onChange={(e) => {
                    handleAvatarChange(e)
                }}></input>

                <input name="age" defaultValue={age} type="text" placeholder="Enter age: " 
                onChange={(e) => {
                    handleAgeChange(e)
                }}></input>

            </form>
            
        </>

    )

}