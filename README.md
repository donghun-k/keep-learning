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
  
  - MongoDB 계정 비밀번호에 특수문자가 들어가 있어서 생긴 문제
  - 비밀번호에 특수문자를 제거 해 해결
  > https://stackoverflow.com/questions/55753484/mongoparseerror-uri-does-not-have-hostname-domain-name-and-tld/56705563
</details>

<details>
  <summary>DELETE 요청의 body를 읽어오지 못하는 현상</summary>
  
  - 
  > https://stackoverflow.com/questions/38294730/express-js-post-req-body-empty
</details>
