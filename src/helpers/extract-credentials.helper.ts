import CustomErrorClass from "../errors/custom-error.class";

/**
 * Extracts the email and password from the authorization header and returns them as an object.
 * 
 * @param authHeader A string containing the email and password encoded in base64.
 * @returns An object with the email and password as properties.
 * @throws {CustomErrorClass} If the authHeader is empty or invalid.
 */
const extractCredentials = (authHeader: string) => {
    if (!authHeader) throw new CustomErrorClass('Error en la cabecera de autenticación', 401);

    // Split the authHeader by space and get the second part
    const auth = authHeader.split(' ')[1];

    // Decode the auth part from base64 and split it by colon
    const [email, password] = Buffer.from(auth, 'base64').toString().split(':');
    
    // Return an object with email and password
    return { email, password };
};

export { extractCredentials }