const express = require('express');
const router = new express.Router();
const Client = require('mongodb').MongoClient;
let db;

Client.connect('mongodb://localhost:27017', async function (error, client) {
  db = client.db('mongo-practice');
  if (error) {
    console.log(error);
  } else {
    console.log('몽고디비 접속')
    // 1. 입력할 document 생성
    // let itsMember = [
    //   { name: '성민킴', age: 29, gender: 'M' },
    //   { name: '태희캉', age: 30, gender: 'M' },
    //   { name: '동훈킴', age: 30, gender: 'M' },
    //   { name: '현우써', age: 31, gender: 'M' },
    // ];
    // 2. test_mongo 컬렉션의 insert( ) 함수에 입력
    // await db.collection('test_mongo').insertMany(itsMember);

    // 3. test_mongo 컬렉션의 리스트 출력.
    // let findResult = await db.collection('test_mongo').find({}, { _id: 0 }).toArray();
    // console.log(findResult)

    // 4. test_mongo 컬렉션에서 이름이 '성민킴' 인 데이터의 나이를 100 으로 변경
    // await db.collection('test_mongo').updateMany({ name: '성민킴' }, { $set: { age: 100 } })

    // 5. test_mongo 컬렉션에서 이름이 '성민킴' 이고 age 가 100 인 데이터 삭제
    // await db.collection('test_mongo').deleteMany({ name: '성민킴', age: 100 });

    // await client.close();
  }
});

router.patch('/addContent', async (req, res, next) => {
  try {
    console.log('/addContent');
    console.log(req.body)
    const { title, content } = req.body;

    await db.collection('testCollection').insertOne({ title, content });

    res.status(200).send({ success: 'success' });
  } catch (e) {
    console.error(e);
    next(e);
  }
},
  (error, req, res, next) => {
    res.status(400).send('Error!', error);
  })

module.exports = router