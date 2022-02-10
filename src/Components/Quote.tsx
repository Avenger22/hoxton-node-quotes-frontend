type Props = {
    item: Quote
}

type Quote = {
    author: string,
    quote: string
}

export default function Quote({item}:Props) {

    return (

        <>

            <li className='quote'>

                <span className="author">
                    {item.author}
                </span>

                <span className="desc">
                    {item.quote}
                </span>

            </li>

        </>

    )

}