import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (productId, body) {


    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/products/${productId}`, {
            method: 'PATCH', 
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( body )
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}