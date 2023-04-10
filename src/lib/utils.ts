export function isBase64Image(str: string | undefined): boolean {
    if (!str) return false
    const regex = /^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64,([^\s]*)$/
    return regex.test(str)
}
