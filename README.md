# bitvalley.covid-19

> COVID-19の情報やコロナウイルスについての予防情報を発信

# 内部结构

- 【开发主文件】目前暂时住页面只有 covid19_top.vue 一个主页面，
- 【开发模块】主页面里面具体的模块都在 /src/toppage/section/里面，
- 【全局变量】全局统一的颜色变量和scss的通用函数写在了 /src/commons/_variables.scss
- 【全局样式】全局统一的class样式写在了 /src/toppage/covid19_top.vue

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
