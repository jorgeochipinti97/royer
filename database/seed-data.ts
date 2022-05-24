import bcrypt from 'bcryptjs';

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}

interface SeedData {
    users: SeedUser[];
}


export const initialData: SeedData = {
    users: [
        {
            name: 'Fernando Mauro Jorge Gaston',
            email: 'royer@admin.com',
            password: bcrypt.hashSync('4285679'),
            role: 'admin'
        },
    ]
}