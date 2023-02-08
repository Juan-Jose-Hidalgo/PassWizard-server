import bcrypt from 'bcryptjs';

const compare = (password: string, passwordDB: string) => bcrypt.compareSync(password, passwordDB);

const encrypt = (password: string) => {
    const jumps = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(password, jumps);
    return pass;
}

export { compare, encrypt }