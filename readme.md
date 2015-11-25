# melon

基于react的ui组件包

## 启动example进行开发

```
npm install
bower install
edp webserver
```

浏览器打开 `http://localhost:8848/example/Button.jsx`即可

## 兼容 ie8

由于 `react` 需要在 `es5-shim` 和 `es5-sham` 的加持下才能使用，因此在 `ie8` 上必须在 `react` 加载前引入这两个库。

关于 `es5-shim` 和 `es5-sham` 参见这里 [es5-shim](https://github.com/es-shims/es5-shim)
