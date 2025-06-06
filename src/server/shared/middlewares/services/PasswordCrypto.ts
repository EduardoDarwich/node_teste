import { compare, genSalt, hash } from "bcryptjs";


const SALT_CHAR = 8;

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(SALT_CHAR);
    return await hash(password, saltGenerated);
    

};
const verifyPassword= async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);


};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword    

}