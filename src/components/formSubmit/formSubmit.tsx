import { Component } from '@tarojs/taro'
import { Button, Form } from '@tarojs/components'
import Api from '../../utils/request'
import './formsubmit.scss'

interface formSubmitProps {
  children?: any;
}
class formSubmit extends Component<formSubmitProps, {}> {
  config = {
    navigationBarTitleText: ''
  }

  constructor(props: formSubmitProps) {
    super(props)
  }

  async formSubmit(e) {
    console.log(e)
    await Api.recordFormid({
      'form_id': e.detail.formId,
      'method': 'POST'
    })
  }


  async componentDidMount() {
  }

  render() {
    return (
      <Form onSubmit={this.formSubmit} reportSubmit="true" className="form-wrap">
        <Button className="report-button" formType="submit">
          {this.props.children}
        </Button>
      </Form>
    )
  }
}

export default formSubmit

