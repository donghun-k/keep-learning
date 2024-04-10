```js
import { $ } from '@donghun-k/mini-query";

$(".btn").click((event) => {
  console.log("this is clicked", event.target)l;
});

console.log("number of buttons", $(".btn").length());
```

# Mini Query
__⟪시나브로 자바스크립트⟫__ 실습 프로젝트입니다.

## What I Learned
- `yarn workspace`를 이용한 monorepo 구성
- **vitest**를 이용한 유닛 테스트 작성