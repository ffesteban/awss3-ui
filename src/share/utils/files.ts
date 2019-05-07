export const fileUtils = {
  getBase64: (base64Data: string, contentType: string): string => `data:${contentType};base64,${base64Data}`
}
