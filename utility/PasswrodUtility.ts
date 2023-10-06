import bcrypt from "bcrypt";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const encryptPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await encryptPassword(enteredPassword, salt) === savedPassword
}

