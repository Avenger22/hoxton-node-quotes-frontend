import { useNavigate } from "react-router-dom"

type Props = {
    item: Quote
}

type Quote = {
    id: number,
    author: string,
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
                    {item.author}
                </span>

                <span className="desc">
                    "{item.quote}"
                </span>

            </li>

        </>

    )

}