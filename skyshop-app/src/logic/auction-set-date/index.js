 const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( auctionId) {

    const { id, token } = this.__credentials__

    return (async () => {
        const response = await fetch(
            `${REACT_APP_API_URL}/auction/product/${id}/${auctionId}`, { 
                method: 'PATCH', 
                headers: { 'content-type': 'application/json', 'authorization':`bearer ${token}` },
            })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
} 