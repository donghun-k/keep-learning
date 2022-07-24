# To-Do List
Express.js & MongoDB 연습용 프로젝트 입니다.

[DEMO](https://to-do-with-express.herokuapp.com/)

## 1. 사용 기술
- Express v4.18.1
- MongoDB 
- EJS

## 2. 주요 기능
<details>
  - 회원가입 / 로그인
  - 글 등록, 수정, 삭제, 검색
  - 실시간 채팅
  <summary>자세히 보기</summary>

</details>

## 3. 트러블 슈팅
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
  - 그러다가 문득 MongoDB 계정을 만드는 과정에서 encodig 어쩌구 하는 메시지가 떴던 것이 기억 남.
  - 알고 보니 비밀번호에 특수문자가 들어가 있어서 생긴 문제. 비밀번호에 특수문자를 제거 해 해결.
  - 경고 메시지 같은 게 뜨면 꼭 잘 읽어보자...
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
  - 해결 방법을 찾던 중 애초에 DELETE 요청에서 Request Body에 파라미터를 담아 보내는 방식이 정상적인 방법이 아님을 알게 됨. 추후 수정 필요. 
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
  - 한글 깨짐은 어차피 인코딩 문제일 거라 판단, 응답을 utf-8로 보내주는 라인을 추가해 해결.
  > https://wowan.tistory.com/59
</details>
