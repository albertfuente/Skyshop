import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (password) {
    const { id, token } = this.__credentials__
   
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/delete`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({password})
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