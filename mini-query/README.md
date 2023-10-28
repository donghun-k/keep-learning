```js
import { $ } from '@donghun-k/mini-query";

$(".btn").click((event) => {
  console.log("this is clicked", event.target)l;
});

console.log("number of buttons", $(".btn").length());
```
