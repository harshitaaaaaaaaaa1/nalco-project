import bcrypt from 'bcrypt'
import { ApiError } from './ApiError.js';

export const hashData = async (data, saltRounds = 10) => {
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while hashing data")
    }
}

export const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while verifying hashed data")
    }
}