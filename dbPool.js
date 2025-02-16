import { MongoClient } from 'mongodb'
const dbHost = "localhost:27017"
const dbUser = "jyri";
const dbPassword = "Salasana1";
const dbName = "testi";
const dataCollection = "data"
const usersCollection = "users"
const destConnString = `mongodb://${dbUser}:${dbPassword}@${dbHost}?authSource=${dbName}`
const dbServer = new MongoClient(destConnString)


const openDbConn = async () => {
 try {
 await dbServer.connect();
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
