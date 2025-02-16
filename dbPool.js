import { MongoClient } from 'mongodb'
const dbHost = "localhost:27017"
const dbUser = "mehr";
const dbPassword = "mehr123";
const dbName = "testi";
const dataCollection = "data"
const usersCollection = "users"
const destConnString = `mongodb://${dbUser}:${dbPassword}@${dbHost}?authSource=${dbName}`
const dbServer = new MongoClient(destConnString)


const openDbConn = async () => {
 try {
 console.log('database connnecting........');
 await dbServer.connect();
 console.log('database connection established');
 
 return dbServer.db(dbName)
 } catch (error) {
 console.error("Failed to conencto to the database", error)
 throw error;
 }
}



export {
    openDbConn,
    usersCollection,
    dataCollection,
    dbServer
}
