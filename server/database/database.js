const Client = require('mongodb').MongoClient;

const mongoDB = Client.connect('mongodb://localhost:27017', async function (error, client) {
    let db = client.db('mongo-practice');
    if (error) {
        console.log(error);
        client.close()
    } else {
        console.log('몽고디비 접속');
        console.log(db.collection('testCollection'))
        return db.collection('testCollection');
        // await client.close();
        /*
        * You don't have to manage the connection yourself. 
        * The MongoClient.connect call comes with batteries included. 
        * See the docs: the connect methods includes a autoReconnect (defaults to true) which will attempt to keep the connection available. 
        * You also have poolSize (defaults to 5) to give the client (that you can save and reuse throughout your app) the opportunity to use more than 1 connection. 
        */
    }
});

// const mongoDB = () => {
//     return new Promise((resolve, reject) => {
//         try {
//             let db;
//             Client.connect('mongodb://localhost:27017', async function (error, client) {
//                 db = client.db('mongo-practice');
//                 if (error) {
//                     console.log(error);
//                     client.close();
//                 } else {
//                     console.log('몽고디비 접속');
//                     // await client.close();
//                     /*
//                     * You don't have to manage the connection yourself. 
//                     * The MongoClient.connect call comes with batteries included. 
//                     * See the docs: the connect methods includes a autoReconnect (defaults to true) which will attempt to keep the connection available. 
//                     * You also have poolSize (defaults to 5) to give the client (that you can save and reuse throughout your app) the opportunity to use more than 1 connection. 
//                     */
//                 }
//             })
//             db.collection('testCollection')
//             // resolve(db.collection('testCollection'))
//         }
//         catch (e) {
//             reject(e);
//         }
//         // const connection = mysql.createConnection(mysqlConfig)
//         // try {
//         //     connection.query(query, (error, result) => {
//         //         if (error) {
//         //             // console.log(error)
//         //             connection.end()
//         //             console.log('reject!', query)
//         //             reject({ error: 'Query error!' })
//         //         } else {
//         //             connection.end()
//         //             resolve(result)
//         //         }
//         //     })
//         // } catch (e) {
//         //     connection.end()
//         //     reject(e)
//         // }
//     })
// }

module.exports = {
    mongoDB,
}