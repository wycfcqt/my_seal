# my_seal

## 介绍

* 包含两个功能对象：1. 公司公章； 2. 个人公章

## 使用方法

1. 公司公章：

```javascript

var seal = new CompanySeal(id, option) {
  ...
}

id: canvas的id
option: 配置对象{
  radius: number(半径，默认值75),
  color: String(颜色，关键字或十六进制颜色字符，默认 红色),
  fontFamily: String(字体，默认宋体),
  companyName: String(公司名称，默认为 青岛国富金融资产交易中心),
  typeName: String(印章类型，可选),
  hasInnerLine: Boolean(内边框，可选),
  securityCode: String(防伪码，可选)
}
seal.saveSealImg(): 将图片转化成 base64

```

2. 个人印章

```javascript
var seal = new PersonSeal(id, option) {
  ...
}

id: canvas的id
option: 配置对象{
  color: String(颜色，关键字或十六进制颜色字符),
  fontFamily: String(字体，默认宋体),
  personName: String(名称，默认为 张三),
  type: Number(类型(1: 正方形，2: 长方形)，默认为 1)
}
seal.saveSealImg(): 将图片转化成 base64
```

## 更新

1. 添加保存功能
2. 公司公章可以调整半径大小，可添加防伪码
3. 个人印章可以设置类型