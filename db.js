const MongoClient = require('mongodb').MongoClient;

const url = `mongodb://test01:${encodeURIComponent('a@123456')}@103.74.122.87:27000`;

const keyword = "bao";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
        console.log('Database connected!');

    var mydb = db.db("fanpage");
    var document = mydb.collection('feeds_qa');

    // document.find({ "entry.changes.value.item": "comment", sys_status: 0 }).toArray((err, docs) => {
    //     console.log(docs);
    // }) 

    db.close();
}); 

// set status for message has "bao"

MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        console.log(err);
    }
    var mydb = db.db("fanpage");
    var col = mydb.collection('feeds_qa');
    var col_post = mydb.collection('feeds_qa_post');
    var col_cmt = mydb.collection('feeds_qa_cmt');

    var query = {
        "entry.changes.value.item": { $in: ["comment"]},
        "entry.changes.value.verb" : { $in: ["add", "edited"]}
    };
 
    col.find(query).toArray((err, docs) => {
        docs.map((data, i) => {
            if (data.entry[0].changes[0].value.message.indexOf(keyword) != -1) {
                console.log("The word violated has been found !");
                col_cmt.updateOne({_id : data._id}, {$set : {status : 1}})
            }
            else
                col_cmt.updateOne({_id : data._id}, {$set : {status : 0}})
        });
    });
});

const getPort = (port) => {
    return port || 3000;
};

module.exports = { getPort };