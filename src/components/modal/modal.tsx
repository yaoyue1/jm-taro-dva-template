import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './modal.scss'

interface ModalProps {
  // 显示
  visible?: boolean;
  // 标题
  title?: string;
  // 信息
  text?: string;
  // 展示关闭按钮
  showCancel?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
  // 取消文案
  cancelText?: string;
  // 确定文案
  okText?: string;
  // 居中
  centered?: boolean;
  // 宽度
  width?: string | number;
  //点击蒙层是否允许关闭
  maskClosable?: boolean;
  okStyle?: string;
  cancelStyle?: string;
}

interface ModalState {
  visible: boolean;
  title: string;
  text: string;
  cancelText: string;
  okText: string;
  width: string | number;
  showCancel: boolean;
  okStyle?: string;
  cancelStyle?: string;
}

class XXModal extends Component<ModalProps, ModalState> {
  // 初始化props
  static defaultProps: Partial<ModalProps> = {
    centered: true,
    visible: false,
    onOk: () => { },
    onCancel: () => { },
    afterClose: () => { }
  };

  constructor(props: ModalProps) {
    super(props)
    this.state = this.initState(props)
  }

  initState(props: ModalProps) {
    return {
      visible: props.visible || false,
      title: props.title || '',
      text: props.text || '',
      cancelText: props.cancelText || '取消',
      okText: props.okText || '确定',
      width: props.width || '622',
      showCancel: props.showCancel || true,
      okStyle: props.okStyle || '',
      cancelStyle: props.cancelStyle || '',
    }
  }
  close() {
    const afterClose = this.props.afterClose
    typeof afterClose === 'function' && afterClose()
    this.setState(this.initState({}))
  }

  onCancel() {
    typeof this.props.onCancel === 'function' && this.props.onCancel()
    this.close()
  }

  onOk() {
    typeof this.props.onOk === 'function' && this.props.onOk()
    this.close()
  }

  componentDidMount() {
  }

  render() {
    let { width, showCancel, cancelText, okText, title, text, cancelStyle, okStyle } = this.state
    width = this.props.width || width
    showCancel = this.props.showCancel || showCancel
    cancelText = this.props.cancelText || cancelText
    okText = this.props.okText || okText
    title = this.props.title || title
    text = this.props.text || text
    cancelStyle = this.props.cancelStyle || cancelStyle
    okStyle = this.props.okStyle || okStyle


    const modalMainSty = `width:${width}rpx;height:auto`

    return (
      <View className={`modal-wrap `}>
        <View className="modal-main" style={modalMainSty}>
          <View className="title">{title}</View>
          <View className="text">{text}</View>
          <View className="btn-wrap">
            {showCancel && <View className="btn" style={cancelStyle} onClick={this.onCancel}>{cancelText}</View>}
            <View className="btn" style={okStyle} onClick={this.onOk}>{okText}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default XXModal
