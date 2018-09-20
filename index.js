/*
 * @Author: jianjun.wei
 * @Date: 2018-09-19 14:47:15
 * @Last Modified by: jianjun.wei
 * @Last Modified time: 2018-09-20 12:02:36
 */

/**
 *公司公章
 *
 * @param {String} id
 * @param {Object} option
 */
function CompanySeal(id, option) {
  // 获取 canvas
  this.canvas = document.querySelector(id);
  // 获取 ctx
  this.ctx = this.canvas.getContext('2d');

  // 对 option 进行处理，如果没有传入就为空对象
  option = option || {};

  /* 用户可配置项 */

  // 印章半径
  this.radius = option.radius || 75;
  // 印章颜色
  this.color = option.color || '#e60021';
  // 字体
  this.fontFamily = option.fontFamily || '宋体';
  // 公司名称
  this.companyName = option.companyName || '青岛国富金融资产交易中心';
  // 印章类型名称
  this.typeName = option.typeName;
  // 是否有内边框线
  this.hasInnerLine = option.hasInnerLine;
  // 防伪码
  this.securityCode = option.securityCode;

  /* 默认根据半径进行设置 */

  // 边框线的宽度
  this.lineWidth = 0.06 * this.radius; // 4.5
  // 文字与外边框线的距离
  this.lineTextGap = 0.73;
  // 公司名称字体大小
  this.companyNameFontSize = 0.23 * this.radius;
  // 印章类型名称字体大小
  this.typeNameFontSize = 0.16 * this.radius;
  //
  this.securityCodeFontSize = 0.12 * this.radius;
  // 内边框线的宽度
  this.innerLineWidth = 1 / 75 * this.radius;
  // 字与字之间相差的弧度
  this.step = 0.32;
  // 根据公司名称有多少个字，控制第一个字的起始位置
  this.aStartPos = [0, -0.15, -0.31, -0.5, -0.63, -0.83, -0.95, -1.12, -1.27, -1.44, -1.61, -1.77, -1.93, -2.1, -2.23, -2.4, -2.57, -2.73, -2.89];
  // 起始位置的index
  this.startIndex = this.companyName.length - 1;
  // 起始位置
  this.startPos = this.aStartPos[this.startIndex];


  // 初始化
  this._init();
}

CompanySeal.prototype = {
  constructor: CompanySeal,
  _init: function () {
    this.canvas.width = this.canvas.height = this.radius * 2;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._drawOuterLine();
    if (this.hasInnerLine) {
      this._drawInnerLine();
    }
    this._drawStar();
    if (this.companyName) {
      this._drawCompanyName(this.companyName);
    }
    if (this.typeName) {
      this._drawTypeName(this.typeName);
    }
    if (this.securityCode) {
      this._drawSecurityCode(this.securityCode);
    }
  },
  _drawOuterLine: function () {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.restore();
  },
  _drawInnerLine: function () {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.innerLineWidth;
    this.ctx.beginPath();
    this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - this.radius / 15, 0, Math.PI * 2, true);
    this.ctx.stroke();
    this.ctx.restore();
  },
  _drawStar: function () {
    var R = this.radius,
      r = R / 3,
      c = 360 / 5 * Math.PI / 180,
      d = c / 2,
      e = d / 2,
      l = r * Math.sin(e) / Math.sin(d + e),
      lsd = l * Math.sin(d),
      lcd = l * Math.cos(d),
      lsc = l * Math.sin(c),
      lcc = l * Math.cos(c),
      rsc = r * Math.sin(c),
      rcc = r * Math.cos(c),
      rsd = r * Math.sin(d),
      rcd = r * Math.cos(d),
      p0 = [R, 2 / 3 * R],
      p1 = [R + lsd, R - lcd],
      p2 = [R + rsc, R - rcc],
      p3 = [R + lsc, R + lcc],
      p4 = [R + rsd, R + rcd],
      p5 = [R, R + l],
      p6 = [R - rsd, R + rcd],
      p7 = [R - lsc, R + lcc],
      p8 = [R - rsc, R - rcc],
      p9 = [R - lsd, R - lcd],
      aPs = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9];
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    aPs.forEach(function (item) {
      this.ctx.lineTo(item[0], item[1]);
    }, this)
    // for (var i = 0; i < aPs.length; i++) {
    //   var item = aPs[i];
    //   this.ctx.lineTo(item[0], item[1]);
    // }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  },
  _drawCompanyName: function (companyName) {
    this._drawText(companyName, this.companyNameFontSize, false, false);
  },
  _drawText: function (text, fontSize, isTypeName, isSecurityCode) {
    var i, letter;
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.font = 'normal normal bold ' + fontSize + 'px ' + this.fontFamily;
    this.ctx.textBaseline = 'middle';
    if (isTypeName) {
      this.ctx.textAlign = 'center';
    } else {
      this.ctx.textAlign = 'left';
    }
    this.ctx.translate(this.radius, this.radius);
    if (isTypeName) {
      this.ctx.fillText(text, 0, this.radius / 2);
    } else {
      for (i = 0; i < text.length; i++) {
        letter = text[i];
        if (isSecurityCode) {
          this._drawLetter(letter, 0.57 - i * 0.1, -this.securityCodeFontSize / 2, this.radius * 0.8);
        } else {
          this._drawLetter(letter, this.startPos + i * this.step, -fontSize / 2, -this.radius * this.lineTextGap);
        }
      }
    }
    this.ctx.restore();
  },
  _drawLetter: function (letter, angle, x, y) {
    this.ctx.save();
    this.ctx.rotate(angle);
    this.ctx.fillText(letter, x, y);
    this.ctx.restore();
  },
  _drawTypeName: function (typeName) {
    this._drawText(typeName, this.typeNameFontSize, true, false);
  },
  _drawSecurityCode: function (code) {
    this._drawText(code, this.securityCodeFontSize, false, true);
  },
  saveSealImg: function () {
    return this.canvas.toDataURL();
  }
}
/**
 *个人印章
 *
 * @param {String} id
 * @param {Object} option
 */
function PersonSeal(id, option) {
  this.canvas = document.querySelector(id);
  this.ctx = this.canvas.getContext('2d');
  option = option || {};
  this.personName = option.personName || '张三';
  this.fontFamily = option.fontFamily || '宋体';
  this.color = option.color || '#e60021';
  this.personLineWidth = 4;
  this.personNameFontSize = 40;
  this.fontWeight = 'bold';
  this._init();
}

PersonSeal.prototype = {
  constructor: PersonSeal,
  _init: function () {
    this._drawPersonOuterLine();
    this._drawPersonName();
  },
  _drawPersonOuterLine: function () {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.personLineWidth;
    this.ctx.beginPath();
    this.ctx.strokeRect(30, 30, 90, 90);
    this.ctx.stroke();
    this.ctx.restore();
  },
  _drawPersonName: function () {
    var length = this.personName.length;
    switch (length) {
      case 2:
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'normal normal ' + this.fontWeight + ' ' + this.personNameFontSize +
          'px ' + this.fontFamily;
        this.ctx.fillText(this.personName.charAt(0), 95, 55);
        this.ctx.fillText(this.personName.charAt(1), 95, 95);
        this.ctx.fillText('之', 55, 55);
        this.ctx.fillText('印', 55, 95);
        this.ctx.restore();
        break;
      case 3:
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'normal normal ' + this.fontWeight + ' ' + this.personNameFontSize +
          'px ' + this.fontFamily;
        this.ctx.fillText(this.personName.charAt(0), 95, 55);
        this.ctx.fillText(this.personName.charAt(1), 95, 95);
        this.ctx.fillText(this.personName.charAt(2), 55, 55);
        this.ctx.fillText('印', 55, 95);
        this.ctx.restore();
        break;
      case 4:
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.textBaseline = 'middle';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'normal normal ' + this.fontWeight + ' ' + this.personNameFontSize +
          'px ' + this.fontFamily;
        this.ctx.fillText(this.personName.charAt(0), 95, 55);
        this.ctx.fillText(this.personName.charAt(1), 95, 95);
        this.ctx.fillText(this.personName.charAt(2), 55, 55);
        this.ctx.fillText(this.personName.charAt(3), 55, 95);
        this.ctx.restore();
        break;
    }
  },
  saveSealImg: function () {
    return this.canvas.toDataURL();
  }
}

module.exports = {
  CompanySeal,
  PersonSeal
}