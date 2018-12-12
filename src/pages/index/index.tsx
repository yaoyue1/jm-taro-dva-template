
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import { FormSubmit } from '../../components'

@connect(({ index }) => ({
    ...index,
}))

class Index extends Component<IndexProps, IndexState> {
    config: Config = {
        navigationBarTitleText: '标题'
    }
    constructor(props: IndexProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.dispatch({ type: 'index/test' })

    }

    render() {
        return (
            <FormSubmit>
                <View className='fx-index-wrap'>

                </View>
            </FormSubmit>
        )
    }
}

export default Index
