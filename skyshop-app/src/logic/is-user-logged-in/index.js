export default function () {
    const { id, token } = this.__credentials__

    return !!(id && token)
}