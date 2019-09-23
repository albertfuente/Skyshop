const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( productId) {

    const { id, token } = this.__credentials__


    return (async () => {
        const response = await fetch( `${REACT_APP_API_URL}/auction/${id}/product/${productId}`, { 
                method: 'POST', 
                headers: { 'content-type': 'application/json', 'authorization':`bearer ${token}` },
            })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        const {auctionId}= await response.json()
        return auctionId
        
    })()
}