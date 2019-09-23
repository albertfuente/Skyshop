import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (title,{name},description,size,color,price) {
    const image=name

    validate.string(title,'title')
     //validate.string(image,'image')
     validate.string(description,'description')
     validate.string(size,'size')
     validate.string(color,'color')
     validate.number(price,'price')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/products`, {
            method: 'POST', 
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title,image,description,size,color,price })
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}