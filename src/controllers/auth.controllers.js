import db from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function createUser (req, res) {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const existingEmail = await db.collection('users').findOne({ email });
        if (!existingEmail) {
            try {
                await db.collection('users').insertOne({
                    name,
                    email,
                    password: passwordHash
                });
            
                res.sendStatus(201);
            } catch (error) {
                res.send(error.message);
            }
        } else {
            res.status(409).send('O e-mail fornecido já está em uso');
        }
    } catch (error) {
        res.send(error.message);
    }
}

async function postLogin (req, res) {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    
    if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        
        if (passwordIsValid) {
            const token = uuid();

            await db.collection('sessions').insertOne({
                userId: user._id,
                token,
                lastStatus: Date.now()
            });

            res.send(token);
        } else {
            res.status(400).send('E-mail ou senha inválidos');
        }
    } else {
        res.status(400).send('E-mail ou senha inválidos');
    }
}

export { createUser, postLogin };