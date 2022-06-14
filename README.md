# To-Do List
Express.js 연습용 프로젝트 입니다

## 사용 기술
- Express v4.18.1
- MongoDB 
- EJS

## 트러블 슈팅
<details>
  <summary>MongoAPIError: URI must include hostname, domain name, and tld
    at resolveSRVRecord</summary>
  
  
  - MongoDB 계정 비밀번호에 특수문자가 들어가 있어서 생긴 문제.
  - 비밀번호에 특수문자를 제거 해 해결.
  > https://stackoverflow.com/questions/55753484/mongoparseerror-uri-does-not-have-hostname-domain-name-and-tld/56705563
</details>

<details>
  <summary>서버에서 DELETE 요청의 body를 읽어오지 못하는 현상</summary>
  
  
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L102-L104
  - DELETE 요청을 받았는데 DB의 데이터가 제대로 삭제가 되지 않음.
  - ```console.log(req.body)```로 요청의 body를 읽어보니 ```{}```가 출력 되는 것을 확인.
  - 요청을 보내는 부분에서는 문제 될 부분이 없기에 요청을 받는 서버의 문제라고 판단
  
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L8
  - body-parser에 Request Body를 json 형식으로 parsing 하게 해주는 라인을 추가해서 해결.
  - 해결 방법을 찾던 중 애초에 DELETE 요청에서 Request Body에 파라미터를 담아 보내는 방식이 정상적인 방법이 아님을 알게 됨. 추후 수정 필요. 
  > https://stackoverflow.com/questions/38294730/express-js-post-req-body-empty
</details>

<details>
  <summary>서버에서 응답에 담아 보낸 alert의 한글 메시지가 깨지는 현상 </summary>
  
  
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L129-L130
  - 서버의 응답에 클라이언트에게 alert을 띄우고 페이지를 이동하게하는 스크립트를 추가하는 코드 작성.
  - alert도 제대로 뜨고 페이지 이동도 문제 없었지만 alert의 메시지가 깨지는 현상 발생.
  
  https://github.com/donghun-K/to-do-list/blob/00c090c4c4d3d5bbd4d96d841cf51167af99d664/server.js#L128-L130
  - 한글 깨짐은 어차피 인코딩 문제일 거라 판단, 응답을 utf-8로 보내주는 라인을 추가해 해결.
  > https://wowan.tistory.com/59
</details>
