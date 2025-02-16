import { dataCollection, usersCollection, openDbConn, dbServer } from './dbPool.js';



const sendQuery = async (query, toArray = false) => { 
    try {
        const result = await query;
        if(toArray)
            return await result.toArray();
        else 
            console.log("should do something");
    } catch (err) {
        console.error("Query execution failed", err);
        throw err;
    }
}



// Method for using a certain collection
const connDbCollection = async (collection) => {
    const db = await openDbConn();
    return db.collection(collection);
}

// Get One User
const findOneUser = async (username) => {
    console.log(username);
    const usersCol = await connDbCollection(usersCollection);
    return sendQuery(usersCol.find({ username }).project({
        username: "$username",
        password: "$password",
        _id: 0
    }), true);
}

//find all users
const getAllUsers = async () => {
    const usersCol = await connDbCollection(usersCollection);
    return sendQuery(usersCol.find({}), true);
};

//create user
const addOneUser = async (username, password) => {
    const usersCol = await connDbCollection(usersCollection);
    return sendQuery(usersCol.insertOne({ username, password }));
};

//get all data
const getAllData = async () => {
    const dataCol = await connDbCollection(dataCollection);
    return sendQuery(dataCol.find({}), true);
};

//get by id
const getDataById = async (id) => {
    const dataCol = await connDbCollection(dataCollection);
    return sendQuery(dataCol.findOne({ _id: new ObjectId(id) }));
};

//add data
const addData = async ({ Firstname, Surname, userid }) => {
    const dataCol = await connDbCollection(dataCollection);
    return sendQuery(dataCol.insertOne({ Firstname, Surname, userid }));
};

// add random users
const addRandomUsers = async (maxUsers) => {
    try {
        const users = Array.from({ length: maxUsers }, (_, i) => ({
            username: `user${i}`,  
            password: `pass${i}`,
        }));
        const usersCol = await connDbCollection(usersCollection);
        const result = await sendQuery(usersCol.insertMany(users));

        return result;
    } catch (error) {
        console.error("Error adding random users:", error);
        throw error;
    }
};


const closeDbConnection = async () => {
    try {
        await dbServer.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Failed to close the database connection", error);
    }
}

process.on("SIGINT", closeDbConnection);
process.on("SIGTERM", closeDbConnection);


let logonUsers = new Map();
export {
    findOneUser,
    getAllUsers,
    addOneUser,
    getAllData,
    getDataById,
    addData,
    addRandomUsers,
    logonUsers
};


