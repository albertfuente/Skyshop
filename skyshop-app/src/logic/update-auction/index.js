const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function ( auctionId,price) {

    const { id, token } = this.__credentials__

    return (async () => {
        const response = await fetch(
            `${REACT_APP_API_URL}/auction/${id}/${auctionId}`, { 
                method: 'PATCH', 
                headers: { 'content-type': 'application/json', 'authorization':`bearer ${token}` },
                body: JSON.stringify({price})
            })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}