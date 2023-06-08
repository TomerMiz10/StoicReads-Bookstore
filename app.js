// import the MongoDB driver
const MongoClient = require('mongodb').MongoClient;

//Set up the MongoDB connection
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

//Connect to MongoDB
MongoClient.connect(url,function(err,client){
    if(err){
        console.error('Failed to connect to MongoDB: ', err);
        return;
    }

    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // Perform MongoDB operations
  // ...

  // Remember to close the connection when done
  client.close();
});


/*
//Example of Insert a document into a collection
const collection = db.collection('mycollection');
const document = { name: 'John', age: 30 };
collection.insertOne(document, function(err, result) {
  if (err) {
    console.error('Failed to insert document:', err);
    return;
  }
  console.log('Document inserted successfully');
});
*/


//Example of Querying Documents:
/*
const collection = db.collection('mycollection');
collection.find({}).toArray(function(err, docs) {
  if (err) {
    console.error('Failed to retrieve documents:', err);
    return;
  }
  console.log('Documents:', docs);
});
*/


//example of Inserting Documents:
/*
const collection = db.collection('mycollection');
const document = { name: 'John', age: 30 };
collection.insertOne(document, function(err, result) {
  if (err) {
    console.error('Failed to insert document:', err);
    return;
  }
  console.log('Document inserted successfully');
});
*/

//Updating Documents:
/*
const collection = db.collection('mycollection');
const filter = { name: 'John' };
const update = { $set: { age: 31 } };
collection.updateOne(filter, update, function(err, result) {
  if (err) {
    console.error('Failed to update document:', err);
    return;
  }
  console.log('Document updated successfully');
});
*/


//Deleting Documents:

/*
const collection = db.collection('mycollection');
const filter = { name: 'John' };
collection.deleteOne(filter, function(err, result) {
  if (err) {
    console.error('Failed to delete document:', err);
    return;
  }
  console.log('Document deleted successfully');
});
*/