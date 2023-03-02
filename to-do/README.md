# To-Do
[《Node.js, MongoDB로 2시간 만에 빠르게 웹서비스 만들기》](https://codingapple.com/course/node-express-mongodb-server/) 강의 실습 프로젝트 입니다.

## 1. 사용 기술
## 학습한 것
### 주요 기술
|Framework|Database|
|:---:|:---:|
|![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)|![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)|
### 그 외 연습한 것
- EJS 템플릿 엔진 써보기
- Passport.js를 사용한 인증 기능
- Socket.io를 사용한 실시간 채팅 기능

## 문제 해결
<details>
  <summary>3-1. 'MongoAPIError: URI must include hostname, domain name, and tld
    at resolveSRVRecord' 에러 발생</summary>
  
  
  ### 😣 문제 상황
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L23
  
  - MongoDB에 접속하는 과정에서 ```MongoAPIError: URI must include hostname, domain name, and tld
    at resolveSRVRecord``` 에러 발생.
  - 해당 에러는 ```process.env.DB_URL```부분에 들어가는 URI 값이 부정확할 때 발생하는 에러.
  - 혹시나 오타가 있었나 몇 번이나 다시 써봤지만 해결되지 않음.
  
  ### ✅ 해결
  - 비밀번호에 특수문자가 포함 돼 있어서 인코딩 과정에서 생긴 문제. 비밀번호에 특수문자를 제거 해 해결.
  > https://stackoverflow.com/questions/55753484/mongoparseerror-uri-does-not-have-hostname-domain-name-and-tld/56705563
</details>

<details>
  <summary>3-2. 서버에서 DELETE 요청의 body를 읽어오지 못하는 현상</summary>
  
  
  ### 😣 문제 상황
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L102-L104
  - DELETE 요청을 받았는데 DB의 데이터가 제대로 삭제가 되지 않음.
  - ```console.log(req.body)```로 요청의 body를 읽어보니 ```{}```가 출력 되는 것을 확인.
  - 요청을 보내는 부분에서는 문제 될 부분이 없기에 요청을 받는 서버의 문제라고 판단.
  
  ### ✅ 해결
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L8
  - body-parser에 Request Body를 json 형식으로 parsing 하게 해주는 라인을 추가해서 해결.
  - 해결 방법을 찾던 중 애초에 DELETE 요청에서 Request Body에 파라미터를 담아 보내는 방식이 정상적인 방법이 아님을 알게 됨.
  > https://stackoverflow.com/questions/38294730/express-js-post-req-body-empty
</details>

<details>
  <summary>3-3. 서버에서 응답에 담아 보낸 alert의 한글 메시지가 깨지는 현상 </summary>


  ### 😣 문제 상황
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L129-L130
  - 서버의 응답에 클라이언트에게 alert을 띄우고 페이지를 이동하게하는 스크립트를 추가하는 코드 작성.
  - alert도 제대로 뜨고 페이지 이동도 문제 없었지만 alert의 메시지가 깨지는 현상 발생.

  ### ✅ 해결
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L128-L130
  - 응답을 utf-8로 보내주는 라인을 추가해 해결.
  > https://wowan.tistory.com/59
</details>

<details>
  <summary>3-4. Collapse 상태 변경 중에도 토글 특수문자가 변경되는 현상 </summary>
  


  ### 😣 문제 상황
  ![before](https://user-images.githubusercontent.com/60064471/190693034-1a53fd41-2660-423c-966d-570978eb928e.gif)
  https://github.com/donghun-K/to-do-list/blob/66ab0dcef065a75368d3b43513aa6cc930dfea4d/views/chat.ejs#L81-L87
  - 유저 리스트 창이 접고 펴지는 데에 약간의 시간이 걸리는 것을 고려하지 않고 토글 버튼 클릭 시 특수문자를 전환하는 코드를 작성함.
  - 그 결과, 토글 버튼을 계속 연타할 경우, 실제 Collapse 상태와 상관없이 계속 토글 특수문자가 변경 됨.

  ### ✅ 해결
  ![after](https://user-images.githubusercontent.com/60064471/190693064-9b9db22e-2803-4119-9f87-af1c33b1d818.gif)
  https://github.com/donghun-K/to-do-list/blob/23d05afdcccc293147c1f624097bddb2a37237a3/views/chat.ejs#L81-L90
  - Collapse 상태 변경 중일 때는 특수문자를 변경하는 코드가 실행되지 않도록 조치.

</details>
