import crypto from 'crypto';

import { secret } from '../envconfig';

export const random = () => crypto.randomBytes(128).toString('base64');

// returns a salt encrypted password
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac('sha256', `${String(salt)}/${String(password)}`) // Ensure the key is a string
        .update(secret)
        .digest('hex');
};
