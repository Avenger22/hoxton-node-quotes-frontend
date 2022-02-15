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

type newQuote = {
    firstName: string,
    lastName: string,
    age: number,
    avatar: string,
    quote: string
}

export default function QuotesPage() {

    const [quotes, setQuotes] = useState<(Quote)[]>([])

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [quote, setQuote] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [idDelete, setIdDelete] = useState<number>(0)
    const [firstNameUpdate, setFirstNameUpdate] = useState<string>('')

    const [formQuote, setFormQuote] = useState<Quote | newQuote |  null>(null)
    const [quotesSearch, setQuotesSearch] = useState<Quote[]>([])
    
    let term: string = 'life'

    function handleFirstNameChange(e:any) {

        const firstName = e.target.value
        let isNum = /^\d+$/.test(firstName) //regex expression checking if a string has only digits

        if (isNum) {
            alert("hey enter string not numbers please")
        }

        else {
            setFirstName(firstName)
        }

    }

    function handleLastNameChange(e:any) {

        const lastName = e.target.value
        let isNum = /^\d+$/.test(lastName) //regex expression checking if a string has only digits

        if (isNum) {
            alert("hey enter string not numbers please")
        }

        else {
            setFirstName(firstName)
        }

        setLastName(lastName)

    }

    function handleQuoteChange(e:any) {

        const quote = e.target.value
        let isNum = /^\d+$/.test(quote) //regex expression checking if a string has only digits

        if (isNum) {
            alert("hey enter string not numbers please")
        }

        else {
            setQuote(quote)
        }

    }

    function handleAvatarChange(e:any) {

        const avatar = e.target.value
        let isNum = /^\d+$/.test(avatar) //regex expression checking if a string has only digits

        if (isNum) {
            alert("hey enter string not numbers please")
        }

        else {
            setAvatar(avatar)
        }
    
    }

    function handleAgeChange(e:any) {

        const age = e.target.value
        let isNum = /^\d+$/.test(age) //regex expression checking if a string has only digits

        if (isNum === false) {
            alert("hey enter number not string please")
        }

        else {
            setAge(age)
        }

    }
    
    function handleFormSubmit(e:any) {

        e.preventDefault()
        
        const newQuoteObject:newQuote = {
            firstName: firstName,
            lastName: lastName,
            age: Number(age),
            quote: quote,
            avatar: avatar
        }

        fetch(`http://localhost:8000/quotes`, {
        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuoteObject)

        }).then(responseItem => responseItem.json())
        
        .then(newQuote => {
            const updatedQuotes:Quote[] = [...quotes, newQuote]
            setQuotes(updatedQuotes)
        })

        setFormQuote(newQuoteObject)
        
    }

    function getQuotesFromServer():void {
        
        fetch(`http://localhost:8000/quotes`)
        .then(resp => resp.json())
        .then(quotesFromServer => setQuotes(quotesFromServer))
    
    }

    function handleUpdateSubmit(e:any) {

        e.preventDefault()

        // const firstName = e.target.firstNameUpdate.value
        const firstName = firstNameUpdate
        const newQuoteObject = {firstName: firstName}

        fetch(`http://localhost:8000/quotes/3`, {
        
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuoteObject)

        }).then(responseItem => responseItem.json())
        
        .then(newQuote => {

            const match = quotes.find(quote => quote.id === 3)
            // @ts-ignore
            match.firstName = newQuoteObject.firstName

            const updatedQuotes:Quote[] = quotes
            setQuotes(updatedQuotes)

        })

    }

    function handleIdDeleteChange(e:any) {
        const idDeleted: number = Number(e.target.value)
        setIdDelete(idDeleted)
    }

    function handleDeleteSubmit(e:any) {

        e.preventDefault()

        fetch(`http://localhost:8000/quotes/${idDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => response.json())

        .then(deletedQuote => {
            const updatedQuotes:Quote[] = quotes.filter(quote => quote.id !== deletedQuote.id)
            setQuotes(updatedQuotes)
        })

    }

    function getQuotesSearchFromServer():void {
        
        fetch(`http://localhost:8000/quotes?search=${term}`)
        .then(resp => resp.json())
        .then(quotesSearchFromServer => setQuotesSearch(quotesSearchFromServer))
    
    }

    function handlefirstNameUpdateChange(e:any) {
        setFirstNameUpdate(e.target.value)
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

            <div className="form-wrapper">

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

                    <button>
                        Submit
                    </button>

                </form>

                <form onSubmit={(e)=> handleDeleteSubmit(e)}>
                
                    <input name="id-delete" defaultValue={1} type="text" placeholder="Enter id to delete: " 
                    onChange={(e) => {
                        handleIdDeleteChange(e)
                    }}></input>

                    <button>
                        submit
                    </button>

                </form>

                <form onSubmit={(e)=> handleUpdateSubmit(e)}>
                
                    <input name="firstNameUpdate" defaultValue={'albert'} type="text" placeholder="Enter firstName to update: " 
                    onChange={(e) => {
                        handlefirstNameUpdateChange(e)
                    }}></input>

                    <button>
                        submit
                    </button>

                </form>

            </div>
            
        </>

    )

}