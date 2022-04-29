import { PureComponent } from 'react';

export default class ProgressBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkOut: 0
    }
    this.generateKey = this.generateKey.bind(this)
    this.changeTheme = this.changeTheme.bind(this)
    this.lastTheme = this.lastTheme.bind(this)
  }
  changeTheme(index, element) {
    const { checkOut } = this.state;
    let changeTheme;
    if (element === "bar") {
      changeTheme = checkOut >= index ? "ProgressBar__middleItem__bar-active" : "ProgressBar__middleItem__bar"
    } else if (element == "index") {
      changeTheme = checkOut >= index ? "ProgressBar__middleItem__index-active" : "ProgressBar__middleItem__index"
    } else {
      changeTheme = checkOut >= index ? "ProgressBar__middleItem__text-active" : "ProgressBar__middleItem__text"
    }
    return changeTheme
  }
  lastTheme(array) {
    const { checkOut } = this.state;

    let changeTheme = checkOut === array.length - 1 ? "ProgressBar__lastItem-active" : "ProgressBar__lastItem"
    return changeTheme
  }
  generateKey = (pre, index) => {
    return `${pre}_${new Date().getTime()}_${index}`;
  }
  componentDidUpdate(prevProps) {
    const { checkoutStep } = this.props;
    const { checkOut } = this.state;
    const { checkoutStep: prevCheckoutStep } = prevProps;

    if (checkoutStep !== prevCheckoutStep) {
      this.setState({ checkOut: checkOut + 1 });
    }
  }

  render() {
    const { steps, checkoutStep, color } = this.props;
    const { title = '' } = steps[checkoutStep];
    let newUrl = title
    newUrl = newUrl.split(" ")[0]
    let result = newUrl[0].toUpperCase() + newUrl.substring(1);
    const { checkOut } = this.state;


    return (
      <div className='ProgressBar' >
        {Object.keys(steps).map((elem, index, array) => {
          if (index === 0) {
            return (
              <div className='ProgressBar__firstItem' key={this.generateKey("firstItem", index)}>
                <div className='ProgressBar__firstItem__bar' ></div>
                < div >
                  <div className='ProgressBar__firstItem__index' >{index + 1} </div>
                  <div className='ProgressBar__firstItem__text' >{result}</div>
                </div>
              </div>
            )
          } else if (array.length - 1 === index) {
            return <div className={this.lastTheme(array)} key={this.generateKey("lastItem", index)}  ></div>
          } else {
            return (
              <div className='ProgressBar__middleItem' key={this.generateKey("item", index)}>
                <div className={this.changeTheme(index, "bar")} ></div>
                <div>
                  <div className={this.changeTheme(index, "index")} >{index + 1} </div>
                  <div className={this.changeTheme(index, null)} >{result}</div>
                </div>
              </div>
            )
          }
        })}
      </div >
    )

  }
}

