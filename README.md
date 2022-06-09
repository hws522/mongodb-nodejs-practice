- mongoDB 는 NoSQL 이다. (Not Only SQL) ⇒ 관계형 DB 가 아니라서 고정된 스키마나 join 이 존재하지 않는다.
- RDBMS 와 키워드 비교.
    
    ![Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb0e6826-ba2e-4edf-9646-053caf88e260/Untitled.png)
    

### MongoDB 설치 후, 환경변수 path 에 bin 경로 지정하면 편하긴 함. ⇒ cmd 에서 mongo 치면 바로 cli 작업가능.

- 데이터베이스 목록 확인 ⇒ **show dbs**
- Collection을 생성 ⇒ **db.createCollection('collection_name')**
- Collection 목록 확인 ⇒ **show collections**
- Document 생성(Create) ⇒ **MongoDB 4.2 버전부터는 db.collection.save() 를 지원하나, 공식문서에는 db.collection.insertOne() 혹은 db.collection.insertMany() 를 사용하는 것을 권장하고 있다.**
- 조회(Read) ⇒ **db.collection.find(query: 조건, projection: 조회할 컬럼)**
    - ex) db.collection.use({ age: { &gt: 20 } }, { _id: 0, name: 1, status: 1 })
    - **&eq** ==> 같음 (==)
    - **&gt** ==> 초과 (>)
    - **&gte** ==> 이상 (>=)
    - **&in** ==> 전달한 배열 요소중 하나
    - **&lt** ==> 미만 (<)
    - **&lte** ==> 이하 (<=)
    - **&ne** ==> 같지 않음 (!=)
    - **&nin** ==> 전달한 배열 요소중에 없거나 필드가 존재하지 않을 때 조회
    - **projection** 에 조회할 필드를 전달 할 때에 ( 0 )은 조회하지 않고 ( 1 )은 조회한다.
    - `pretty()`를 사용하면 return data를 format에 맞게 출력한다.
    - .find() 로만 끝내면 별도 지정하지 않은 _id field가 추가된다. 모든 document는 unique한 _id field를 갖는다.
    - select할 field를 지정할 수 있다. _id는 지정하지 않아도 출력에 포함되므로 select할 field에 포함시키지 않을 경우에는 projection의 해당 field의 value에 0을 지정하여 명시적으로 배제하여야 한다. (_id: 0)
- 수정(Update) ⇒ **db.collection.update(query, update, options)**
    - `db.collection.update({ name: 'sue' }, { $set: { status: 'brokers' } })`
    - 위와 같이 필드를 수정할 수 있다.
    - 위 예시에서는 **query** 와 **update** 를 사용했다. **query** 에는 수정할 document를 지정하고 **update** 에는 수정할 내용을 입력한다.
    - 여기서 **update** 에 **&set** 특수 연산자를 사용했다. **&set** 연산자를 사용하면 수정 할 필드를 지정할 수 있다. 만약 **&set** 연산자를 사용하지 않으면 document가 통째로 바뀌어 버린다.
- 삭제(Delete) ⇒ **db.collection.remove()**
    - `db.collection.remove({ name: 'sue' })`
    - 위와 같이 삭제할 document 에 대한 정보가 담긴 객체를 첫번째 인수로 제공하여 삭제할 수 있다.

    <br>
    
    ---

    <br>
    
    ### MongoDB 모듈 연동

<br>

1.  `npm i mongodb` 를 통해 mongodb 모듈을 설치한다. 

<br>

2. Mongo DB를 실행한다.

<br>

3. 아래 코드를 js 파일로 만들어 실행해본다.

    ```jsx
    let Client = require('mongodb').MongoClient;

    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            console.log("connected:"+db);
            db.close();
        }
    });

    // 콘솔에 connected:[Object].. 라는 로그가 출력되면 정상
    ```

<br>

4. Mongo DB를 조작하기 위해서 먼저 기초 데이터를 입력해준다. `insert( )` 함수를 이용해서 한번에 하나씩 입력할 수도 있지만, 여러개의 document 를 `한번에` 입력할 수도 있다.

    **1. 데이터 한개(Single Document) 입력**

    - dbInsert.js

    ```jsx
    let Client = require('mongodb').MongoClient;

    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. 입력할 document 생성
            let michael = {name:'Michael', age:15, gender:'M'};
            // 2. student 컬렉션의 insert( ) 함수에 입력
            db.collection('student').insert(michael);

            db.close();
        }
    });

    ```

    **2. 데이터 여러개(Multi Documents) 입력**

    - dbInsertMany.js

    ```jsx
    let Client = require('mongodb').MongoClient;

    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. 입력할 documents 를 미리 생성
            let jordan = {name:'Jordan', age:16, gender:'M'};
            let amanda = {name:'Amanda', age:17, gender:'F'};
            let jessica = {name:'Jessica', age:15, gender:'F'};
            let james = {name:'James', age:19, gender:'M'};
            let catherine = {name:'Catherine', age:18, gender:'F'}

            // 2. insertMany( ) 함수에 배열 형태로 입력
            db.collection('student').insertMany([jordan,amanda,jessica,james,catherine]);
            db.close();
        }
    });
    ```

<br>

5. 데이터를 읽어온다.
    
    **1. find( ) 함수를 이용한 전체 데이터 읽어오기**
    
    ```jsx
    let Client = require('mongodb').MongoClient;
    
    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. find( ) 함수에 아무런 입력값이 없으면 컬렉션의 전체 document 를 읽어온다.
            let cursor = db.collection('student').find();
            // 2. 읽어온 document 를 cursor 에 넣고 반복처리
            cursor.each(function(err,doc){ // document 가 예약어이기 때문에 변수명을 doc로 변경
                if(err){
                    console.log(err);
                }else{
                    if(doc != null){
                        // 3. document 가 정상적으로 있으면 console 에 출력해준다.
                        console.log(doc);
                    }
                }
            });
            db.close();
        }
    });
    
    ```
    
    **2. Query 로 특정데이터 읽어오기**
    
    Mongo DB가 Nosql 이긴 하지만 데이터를 `검색할때는 query를 해야지만 가져올 수 있다.` 위의 예제에서처럼 query 가 없으면 전체 데이터를 읽어온다.
    
    ```jsx
    let Client = require('mongodb').MongoClient;
    
    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. 읽어올 document 필드값 정의
            let query = {gender:'M'};
            // 2. find( ) 함수에 query 입력
            let cursor = db.collection('student').find(query);
            cursor.each(function(err,doc){
                if(err){
                    console.log(err);
                }else{
                    if(doc != null){
                        console.log(doc);
                    }
                }
            });
            db.close();
        }
    });
    
    ```
    
    **3. Field Projection 으로 특정필드만 가져오기**
    
    데이터를 가져올 때 Document 내에 있는 Field 의 개수가 너무 많으면 데이터 용량이 늘어나게 되므로 `필요한 Field 만 선택해서 가져올 수 있는데 이것을 Projection 이라고 한다`.
    
    ```jsx
    let Client = require('mongodb').MongoClient;
    
    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. 쿼리작성
            let query = {gender:'M'};
            // 2. 읽어올 Field 선택
            let projection = {name:1,age:1,_id:0};
            // 3. find() 함수에 작성된 query와 projection을 입력
            let cursor = db.collection('student').find(query,projection);
            cursor.each(function(err,doc){
                if(err){
                    console.log(err);
                }else{
                    if(doc != null){
                        console.log(doc);
                    }
                }
            });
            db.close();
        }
    });
    
    ```
    
    프로젝션 사용시에 주의할 점은 기본 필드인 _id 필드를 제외하고는 필드선택 여부가 모두 동일해야 한다.
    
    ```jsx
    let prj1 = {name:1, age:1}; // O 가능 - name,age 필드만 가져온다.
    let prj2 = {name:0, age:0}; // O 가능 - name,age 필드를 제외하고 가져온다.
    let prj3 = {name:1, age:0}; // X 불가능 - 오류발생
    ```
    
    **4. $gt(greater than) $lt(less than) 사용하기**
    
    `$gt, $lt` 등의 `Mongo DB 명령어`를 사용해서 검색 범위를 특정할 수 있다.
    
    ```jsx
    let Client = require('mongodb').MongoClient;
    
    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            // 1. gender 가 'F' 이면서 age 가 16보다 크고 19보다 작은 값 선택
            let query = {gender:'F', age:{'$gt':16,'$lt':19}};
            let cursor = db.collection('student').find(query);
            cursor.each(function(err,doc){
                if(err){
                    console.log(err);
                }else{
                    if(doc != null){
                        // 2. 출력할 document 에서 name 필드만 출력
                        console.log('student name:'+doc.name);
                    }
                }
            });
            db.close();
        }
    });
    
    ```
    
    **5. Paging 처리**
    
    데이터를 처리하다보면 document 의 개수가 많아서 paging 처리를 해야될 경우가 있는데 아래와 같이 `skip( )` 함수와 `limit( )` 함수를 함께 사용해서 처리할 수 있다.
    
    ```jsx
    let Client = require('mongodb').MongoClient;
    
    Client.connect('mongodb://localhost:27017/school', function(error, db){
        if(error) {
            console.log(error);
        } else {
            let query = {}
            // 1. skip - 선택된 document 중에서 건너뛸 개수
            // 2. limit - 선택된 document 중에서 skip 다음 부터 가져올 개수
            //    현재 document 의 개수가 6개이면 2개를 건너띄고 3번째 부터 2개(3번과 4번)를 가져온다.
            let cursor = db.collection('student').find(query).skip(2).limit(2);
            cursor.each(function(err,doc){
                if(err){
                    console.log(err);
                }else{
                    if(doc != null){
                        console.log(doc);
                    }
                }
            });
            db.close();
        }
    });
    ```

<br>

  6. 데이터를 수정한다.

      - `update` 함수는 3개의 인자를 입력받는데, 검색대상을 선택하는 `query`, 실제수정할 데이터정보인 `operator`, 그리고 수정처리에 대한 `option` 을 설정해서 입력하면 된다.

      ```js
      let Client = require('mongodb').MongoClient;

      Client.connect('mongodb://localhost:27017/school', function(error, db){
          if(error) {
              console.log(error);
          } else {
              // 1. 수정 대상 쿼리
              let query = {name:'Michael'};
              // 2. 데이터 수정 명령 : set 명령을 사용하면 특정 field의 값만 변경할 수 있음
              let operator = {name:'Joe', age:15, gender:'M'};
              // 3. 수정 옵션 : upsert 가 true 일 경우 query 대상이 존재하면 update, 없으면 insert 처리
              let option = {upsert:true};
              db.collection('student').update(query,operator,option,function(err,upserted){
                  if(err){
                      console.log(err);
                  }else{
                      console.log('updated successfully!');
                  }
              });
              db.close();
          }
      });
      ```

  <br>

  7. 데이터를 삭제한다.

      -  `remove` 함수로 특정 document를 삭제할 수 있다.

        ```js
        var Client = require('mongodb').MongoClient;

        Client.connect('mongodb://localhost:27017/school', function(error, db){
            if(error) {
                console.log(error);
            } else {
                // 1. 삭제할 대상 쿼리
                var query = {name:'Joe'};
                // 2. remove 함수에 입력
                db.collection('student').remove(query,function(err,removed){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('removed successfully!');
                    }
                });
                db.close();
            }
        });
        ```

<br>