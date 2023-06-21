# pvts

Primitive validator in TypeScript

## Getting Started

```sh
pnpm i pvts
```

```ts
import { pvts } from "pvts";

const validator = pvts()
  .string("文字列を入力してください。")
  .required("値を入力してください。")
  .test();

console.log(validator("foo")) // true
console.log(validator("")) // false
console.log(validator(9)) // false
console.log(validator(null)) // false
console.log(validator()) // false
```
