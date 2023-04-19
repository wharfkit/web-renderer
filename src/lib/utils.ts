export function isBase64Image(str: string | undefined): boolean {
    if (!str) return false
    const regex = /^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64,([^\s]*)$/
    return regex.test(str)
}

//function to test a valid url of an image
export function isUrlImage(str: string | undefined): boolean {
    if (!str) return false
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    return regex.test(str)
}
