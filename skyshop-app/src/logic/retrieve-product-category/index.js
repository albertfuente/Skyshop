const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (title) {

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/product/q/${title}`, {
            method: 'GET',
            headers: {'content-type': 'application/json' }
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        
            const {product}= await response.json()
            return product
        
    })()
}