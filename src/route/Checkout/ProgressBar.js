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
      if (index === checkOut + 1) { return (`${changeTheme} ProgressBar__middleItem__bar-animate`) }

    } else if (element == "index") {
      changeTheme = checkOut >= index ? "ProgressBar__middleItem__index-active" : "ProgressBar__middleItem__index"
      if (index === checkOut + 1) { return (`${changeTheme} ProgressBar__middleItem__index-animate`) }

    } else {
      changeTheme = checkOut >= index ? "ProgressBar__middleItem__index__text-active" : "ProgressBar__middleItem__index__text"
    }

    return changeTheme
  }
  lastTheme(array) {
    const { checkOut } = this.state;

    let changeTheme = checkOut === array.length - 1 ? "ProgressBar__lastItem-active" : "ProgressBar__lastItem"
    if (array.length - 1 === checkOut + 1) { return (`${changeTheme} ProgressBar__lastItem-animate`) }

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
    const { steps, checkoutStep } = this.props;

    const { checkOut } = this.state;

    const stepNames = Object.values(steps).map((item) => {
      let newUrl = item.title
      newUrl = newUrl.split(" ")[0]
      let result = newUrl[0].toUpperCase() + newUrl.substring(1);
      return result
    })

    return (
      <div className='ProgressBar' >
        {[1, 2, 3, 4, 5].map((elem, index, array) => {
          if (index === 0) {
            return (
              <div className='ProgressBar__firstItem' key={this.generateKey("firstItem", index)}>
                <div className='ProgressBar__firstItem__bar' ></div>
                < div >
                  <div className='ProgressBar__firstItem__index' >{index + 1}

                    <div className='ProgressBar__firstItem__index__text' >{stepNames[0]}</div>
                  </div>
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
                  <div className={this.changeTheme(index, "index")} >{index + 1}
                    <div className={this.changeTheme(index, null)} >{stepNames[index]}</div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div >
    )

  }
}

