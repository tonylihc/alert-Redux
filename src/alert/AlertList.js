import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Alert from 'react-bootstrap/lib/Alert'
import {hideAllAlert, alertHide} from './redux'
import 'animate.css/animate.min.css'

// 渲染要显示的信息，并根据类型渲染成不同颜色。
// 为每条信息渲染一个按钮，使用户可以通过点击按钮隐藏该信息。
// 在第一次渲染后，过几秒隐藏来自服务器的信息。

/*
*首先，使用 react-redux 的 connect 将 Redux 的 state 和 action 创建函数传给组件。
 然后在组件中遍历渲染出所有信息（使用了 react-bootstrap 提供的 Alert 组件。
 最后，将 alertHide 函数绑在按钮的点击事件上，将 hideAllAlert 函数绑在组件渲染后的生命周期钩子上。
*/
class AlertList extends Component {
  static propTypes = {
    alerts: PropTypes.array.isRequired,
    hideAllAlert: PropTypes.func.isRequired,
    alertHide: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.hideAllAlert();
  }

  render(){
    const {alerts, alertHide} = this.props;
    return (
      <div>
        {alerts.map((item, i) => (
          <Alert
            className="animated tada"
            key={i}
            bsStyle={item.messageType}
            onDismiss={() => alertHide(item.key)}
          >
            {item.messageText}
          </Alert>
        ))}
      </div>
    );
  }
}
// 使用 react-redux 的 connect 将 Redux 的 state 和 action 创建函数传给组件
export default connect(
  state => ({
    alerts: state.alerts.items
  }),
  {hideAllAlert, alertHide}
)(AlertList)









