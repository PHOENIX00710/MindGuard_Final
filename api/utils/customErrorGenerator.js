export const generateError = (code, message) => {
    let customError = new Error(message);
    customError.statusCode = code;
    return customError
}