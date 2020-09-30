## node package를 설치한다.

`$ yarn`

## 실행

`$ yarn serve`
`$ yarn serve:dev`

## 포트를 바꾸려면, -p 3001 식으로 추가해준다.

`$ yarn serve`
`$ yarn serve -p 3001`

## test in browser

http://localhost:3000

## build

`$ yarn build`

| type | filename                                   | for            | tested |
| ---- | ------------------------------------------ | -------------- | ------ |
| UMD  | things-scene-label.js    | modern browser | O      |
| UMD  | things-scene-label-ie.js | ie 11          | O      |
| ESM  | things-scene-label.mjs   | modern browser | O      |

## publish

`$ yarn publish`
