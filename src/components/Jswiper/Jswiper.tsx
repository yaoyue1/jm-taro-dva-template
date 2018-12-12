import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Jswiper.scss'
// swiper 为了解决微信自带的swiper喜欢卡死在中间的问题

interface JswiperProps {
  onslideUp: any;
  onslideDown: any;
  onslideMove: any;
  onClickHandler: any;
  children: any;
}
class Jswiper extends Component<JswiperProps, {}> {
  config = {
    navigationBarTitleText: ''
  }
  startXY: any
  endXY: any
  moveXY: any
  _moveNum: any
  _numInterval: any
  constructor(props: JswiperProps) {
    super(props)
    this.state = {
    }
    this.startXY = {},
      this.endXY = {},
      this.moveXY = {}
  }
  // 触摸开始
  touchstart(e) {
    // e.stopPropagation()
    this.startXY = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
    this._moveNum = 0
    this._numInterval = 3
  }

  // 触摸结束
  touchend(e) {
    this.endXY = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
    this.endHanler(this.startXY, this.endXY)
  }

  // 触摸结束后校验，是上滑了还是下滑了
  endHanler(startXY, endXY) {
    let gapy = endXY.y - startXY.y
    if (Math.abs(gapy) < 80) { return }
    gapy < 0 ? this.props.onslideUp(gapy) : this.props.onslideDown(gapy)
  }

  touchmove(e) {
    this._moveNum++
    if (this._moveNum % this._numInterval !== 0) return
    e.stopPropagation()
    this.moveXY = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
    let gapy = this.moveXY.y - this.startXY.y
    if (Math.abs(gapy) < 80) { return }
    this.props.onslideMove(gapy)
  }

  onClickHandler() {
    this.props.onClickHandler()
  }

  render() {
    return (
      <View className="j-swiper-slide" onClick={this.onClickHandler} onTouchstart={this.touchstart} onTouchend={this.touchend} onTouchmove={this.touchmove}>
        {this.props.children}
      </View>
    )
  }
}

export default Jswiper

