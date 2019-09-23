import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (productId, image) {

    validate.string(productId, 'id')
    let formData = new FormData()
    formData.append('file', image)

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/products/${productId}/photo`, {
            method: 'POST',
            //headers: {},
            body: formData
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