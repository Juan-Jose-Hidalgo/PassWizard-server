import bcrypt from 'bcryptjs';

/**
 * Compares a plain text password with a hashed password
 * @param password The plain text password
 * @param passwordDB The hashed password
 * @returns A boolean indicating if the passwords match or not
 */
const compare = (password: string, passwordDB: string) => bcrypt.compareSync(password, passwordDB);

/**
 * Encrypts a plain text password using bcrypt
 * @param password The plain text password
 * @returns The hashed password
 */
const encrypt = (password: string) => {
    // Generate a salt with 10 rounds
    const jumps = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    const pass = bcrypt.hashSync(password, jumps);
    return pass;
}

export { compare, encrypt };