import { useNavigate } from "react-router-dom"

type Props = {
    item: Quote
}

type Quote = {
    author: string,
    quote: string
}

export default function Quote({item}:Props) {

    const navigate = useNavigate()

    return (

        <>

            <li className='quote' onClick={function () {
                navigate(`/quotes/${item.author}`)
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