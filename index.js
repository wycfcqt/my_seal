/**
 *公司公章
 *
 * @param {String} id canvas 的 id
 * @param {Object} option 配置对象
 */
function CompanySeal(id, option) {
  this.canvas = document.querySelector(id)
  this.ctx = this.canvas.getContext('2d')
  option = option || {}
  this.radius = option.radius || 75
  this.color = option.color || '#f00'
  this.lineWidth = option.lineWidth || 4
  this.lineTextGap = option.lineTextGap || 0.72
  this.startPos = option.startPos || -1.6
  this.step = option.step || 0.3
  this.companyNameFontSize = option.companyNameFontSize || 16
  this.typeNameFontSize = option.typeNameFontSize || 12
  this.companyNameFontWeight = option.companyNameFontWeight || 'normal'
  this.typeNameFontWeight = option.typeNameFontWeight || 'normal'
  this.fontFamily = option.fontFamily || '宋体'
  this.typeName = option.typeName || ''
  this.companyName = option.companyName || '青岛国富金融资产交易中心'
  this.hasInnerLine = option.hasInnerLine || false
  this._init()
}

CompanySeal.prototype = {
  constructor: CompanySeal,
  _init: function () {
    this.canvas.width = this.canvas.height = this.radius * 2
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this._drawOuterLine()
    if (this.hasInnerLine) {
      this._drawInnerLine()
    }
    this._drawStar()
    if (typeof this.companyName !== 'undefined') {
      this._drawCompanyName(this.companyName)
    }
    if (typeof this.typeName !== 'undefined') {
      this._drawTypeName(this.typeName)
    }
  },
  _drawOuterLine: function () {
    this.ctx.save()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()
    this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth, 0, Math.PI * 2, true)
    this.ctx.stroke()
    this.ctx.restore()
  },
  _drawInnerLine: function () {
    this.ctx.save()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = 1
    this.ctx.beginPath()
    this.ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - 5, 0, Math.PI * 2, true)
    this.ctx.stroke()
    this.ctx.restore()
  },
  _drawStar: function () {
    let R = this.radius
    let r = R / 3
    let c = 360 / 5 * Math.PI / 180
    let d = c / 2
    let e = d / 2
    let l = r * Math.sin(e) / Math.sin(d + e)
    let lsd = l * Math.sin(d)
    let lcd = l * Math.cos(d)
    let lsc = l * Math.sin(c)
    let lcc = l * Math.cos(c)
    let rsc = r * Math.sin(c)
    let rcc = r * Math.cos(c)
    let rsd = r * Math.sin(d)
    let rcd = r * Math.cos(d)
    let p0 = [R, 2 / 3 * R]
    let p1 = [R + lsd, R - lcd]
    let p2 = [R + rsc, R - rcc]
    let p3 = [R + lsc, R + lcc]
    let p4 = [R + rsd, R + rcd]
    let p5 = [R, R + l]
    let p6 = [R - rsd, R + rcd]
    let p7 = [R - lsc, R + lcc]
    let p8 = [R - rsc, R - rcc]
    let p9 = [R - lsd, R - lcd]
    let aPs = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9]
    let _this = this
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    aPs.forEach(function (item) {
      _this.ctx.lineTo(item[0], item[1])
    })
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  },
  _drawCompanyName: function () {
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.font = `normal normal ${this.companyNameFontWeight} ${this.companyNameFontSize}px/1 ${this.fontFamily}, serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'left'
    this.ctx.translate(this.radius, this.radius)
    for (let i = 0; i < this.companyName.length; i++) {
      let letter = this.companyName[i]
      this._drawText(letter, i)
    }
    this.ctx.restore()
  },
  _drawText: function (letter, i) {
    this.ctx.save()
    this.ctx.rotate(this.startPos + i * this.step)
    this.ctx.fillText(letter, -this.companyNameFontSize / 2, -this.radius * this.lineTextGap)
    this.ctx.restore()
  },
  _drawTypeName: function () {
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.font = `normal normal ${this.typeNameFontWeight} ${this.typeNameFontSize}px/1 ${this.fontFamily}, serif`
    this.ctx.textBaseline = 'middle'
    this.ctx.textAlign = 'center'
    this.ctx.translate(this.radius, this.radius)
    this.ctx.fillText(this.typeName, 0, this.radius / 2)
    this.ctx.restore()
  }
}
/**
 *个人印章
 *
 * @param {String} id canvas 的 id
 * @param {Object} option 配置对象
 */
function PersonSeal(id, option) {
  this.canvas = document.querySelector(id)
  this.ctx = this.canvas.getContext('2d')
  option = option || {}
  this.personName = option.personName || '张三'
  this.fontFamily = option.fontFamily || '宋体'
  this.fontWeight = option.fontWeight || 'bold'
  this.personLineWidth = option.lineWidth || 4
  this.color = '#f00'
  this.personNameFontSize = 40
  this._init()
}

PersonSeal.prototype = {
  constructor: PersonSeal,
  _init: function () {
    this._drawPersonOuterLine()
    this._drawPersonName()
  },
  _drawPersonOuterLine: function () {
    this.ctx.save()
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = this.personLineWidth
    this.ctx.beginPath()
    this.ctx.strokeRect(30, 30, 90, 90)
    this.ctx.stroke()
    this.ctx.restore()
  },
  _drawPersonName: function () {
    let length = this.personName.length
    switch (length) {
      case 2:
        this.ctx.save()
        this.ctx.fillStyle = this.color
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = 'center'
        this.ctx.font = `normal normal ${this.fontWeight} ${this.personNameFontSize}px/1 ${this.fontFamily}`
        this.ctx.fillText(this.personName.charAt(0), 95, 55)
        this.ctx.fillText(this.personName.charAt(1), 95, 95)
        this.ctx.fillText('之', 55, 55)
        this.ctx.fillText('印', 55, 95)
        this.ctx.restore()
        break;
      case 3:
        this.ctx.save()
        this.ctx.fillStyle = this.color
        this.ctx.textBaseline = 'middle'
        this.ctx.textAlign = 'center'
        this.ctx.font = `normal normal ${this.fontWeight} ${this.personNameFontSize}px/1 ${this.fontFamily}`
        this.ctx.fillText(this.personName.charAt(0), 95, 55)
        this.ctx.fillText(this.personName.charAt(1), 95, 95)
        this.ctx.fillText(this.personName.charAt(2), 55, 55)
        this.ctx.fillText('印', 55, 95)
        this.ctx.restore()
        break;
    }
  }
}

module.exports = {
  CompanySeal,
  PersonSeal
}