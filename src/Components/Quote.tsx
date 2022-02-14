import { useNavigate } from "react-router-dom"

type Props = {
    item: Quote
}

type Quote = {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    age: number,
    quote: string
}

export default function Quote({item}:Props) {

    const navigate = useNavigate()

    return (

        <>

            <li className='quote' onClick={function () {
                navigate(`/quotes/${item.id}`)
            }}>

                <span className="author">
                    {item.firstName} {item.lastName}
                </span>

                <span className="desc">
                    "{item.quote}"
                </span>

            </li>

        </>

    )

}