# mongoDB + NodeJS(express) ⇒ 

- mongoDB 는 NoSQL 이다. (Not Only SQL) ⇒ 관계형 DB 가 아니라서 고정된 스키마나 join 이 존재하지 않는다.

- RDBMS 와 키워드 비교.

  ![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/eb0e6826-ba2e-4edf-9646-053caf88e260/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220609%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220609T130921Z&X-Amz-Expires=86400&X-Amz-Signature=9f3c449f4833f130ea8a9503fb6c399f4619fb862d009a13d824fcae0466d152&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

<br>

### MongoDB 설치 후, 환경변수 path 에 bin 경로 지정하면 편하긴 함. ⇒ cmd 에서 mongo 치면 바로 cli 작업가능.

- 데이터베이스 목록 확인 ⇒ **show dbs**

- Collection을 생성 ⇒ **db.createCollection('collection_name')**

- Collection 목록 확인 ⇒ **show collections**

- Document 생성(Create) ⇒ **MongoDB 4.2 버전부터는 db.collection.save() 를 지원하나, 공식문서에는 db.collection.insertOne() 혹은 db.collection.insertMany() 를 사용하는 것을 권장하고 있다.**

- 조회(Read) ⇒ **db.collection.find(query: 조건, projection: 조회할 컬럼)**

  - ex) db.collection.use({ age: { &gt: 20 } }, { _id: 0, name: 1, status: 1 })
  - **&eq** ==> 같음 (==)
  - **&gt** ==> 초과 (>)
  - **&gte** ==> 이상 (>=)
  - **&in** ==> 전달한 배열 요소중 하나
  - **&lt** ==> 미만 (<)
  - **&lte** ==> 이하 (<=)
  - **&ne** ==> 같지 않음 (!=)
  - **&nin** ==> 전달한 배열 요소중에 없거나 필드가 존재하지 않을 때 조회
  - **projection** 에 조회할 필드를 전달 할 때에 ( 0 )은 조회하지 않고 ( 1 )은 조회한다.
  - `pretty()`를 사용하면 return data를 format에 맞게 출력한다.
  - .find() 로만 끝내면 별도 지정하지 않은 _id field가 추가된다. 모든 document는 unique한 _id field를 갖는다.
  - select할 field를 지정할 수 있다. _id는 지정하지 않아도 출력에 포함되므로 select할 field에 포함시키지 않을 경우에는 projection의 해당 field의 value에 0을 지정하여 명시적으로 배제하여야 한다. (_id: 0)

- 수정(Update) ⇒ **db.collection.update(query, update, options)**

  - `db.collection.update({ name: 'sue' }, { $set: { status: 'brokers' } })`
  - 위와 같이 필드를 수정할 수 있다.
  - 위 예시에서는 **query** 와 **update** 를 사용했다. **query** 에는 수정할 document를 지정하고 **update** 에는 수정할 내용을 입력한다.
  - 여기서 **update** 에 **&set** 특수 연산자를 사용했다. **&set** 연산자를 사용하면 수정 할 필드를 지정할 수 있다. 만약 **&set** 연산자를 사용하지 않으면 document가 통째로 바뀌어 버린다.

- 삭제(Delete) ⇒ **db.collection.remove()**

  - `db.collection.remove({ name: 'sue' })`
  - 위와 같이 삭제할 document 에 대한 정보가 담긴 객체를 첫번째 인수로 제공하여 삭제할 수 있다.

  ------

  <br>

