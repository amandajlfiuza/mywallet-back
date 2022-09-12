import db from '../database/db.js';

async function postRegister (req, res) {
    const { type, date, description, amount } = req.body;
    const user = res.locals.user;

    await db.collection('registers').insertOne({
        userId: user._id,
        type,
        date,
        description,
        amount
    });

    res.sendStatus(201);
}

async function getCashflow (req, res) {
    const user = res.locals.user;
    const registers = await db.collection('registers').find({ userId: user._id }).toArray();
    console.log(registers);
    res.send({user, registers});
}

async function getBalance (req, res) {
    const user = res.locals.user;
    const registers = await db.collection('registers').find({ userId: user._id }).toArray();

    let balance = 0;
    for (let i=0; i<registers.length; i++) {
        if (registers[i].type === 'inflow') {
            balance += Number(registers[i].amount);
        } else {
            balance -= Number(registers[i].amount);
        }
    }

    res.send({balance});
}

async function updateStatus (req, res) {
    const user = res.locals.user;
    const existingSession = await db.collection('sessions').findOne({ userId: user._id });

    if (!existingSession) return res.sendStatus(404);

    try {
        await db.collection('sessions').updateOne({ userId: user._id }, { $set: {
            lastStatus: Date.now()
        }});
        res.send(200);
    } catch (error) {
        res.send(error.message);
    }
}

async function logOut (req, res) {
    const user = res.locals.user;

    try {
        await db.collection('sessions').deleteOne({ userId: user._id });
    } catch (error) {
        res.send(error.message);
    }

    res.sendStatus(200);
}

function deleteInactives () {
    setInterval(async () => {
        const now = Date.now();
        await db.collection('sessions').deleteMany({ lastStatus: {$lt: now - 10000}});
    }, 15000);
}

export { postRegister, getCashflow, getBalance, updateStatus, logOut, deleteInactives };