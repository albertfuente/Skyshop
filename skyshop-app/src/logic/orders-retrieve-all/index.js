import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {

    const { id, token } = this.__credentials__


    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/allorders/`, {
            method: 'GET',
            headers: {'authorization': `bearer ${token}` }
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            const{orderId} =await response.json()
            return orderId
        }
    })()
}