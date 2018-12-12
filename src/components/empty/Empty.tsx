import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Empty.scss'

interface emptyProps {
  tips?: string;
}
class Empty extends Component<emptyProps, {}>{

  render() {
    const url = 'https://img01.fxqifu.com/c426fd0ed948f9ab00ca3177fae2f762?x-oss-process=image/quality,q_95'
    return (
      <View className="empty-wrap">
        <image src={url} mode="widthFix"></image>
        <View className="text">{this.props.tips || '空～'}</View>
      </View>
    )
  }
}

export default Empty