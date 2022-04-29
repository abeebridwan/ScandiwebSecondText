import { PureComponent } from 'react';

export default class ProgressBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checkOut: 0
    }
    this.generateKey = this.generateKey.bind(this)

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
      <div className='Container' style={{ color: "red" }}>
        {Object.keys(steps).map((elem, index, array) => {
          if (index === 0) {
            return (
              <React.Fragment key={this.generateKey("firstItem", index)}>
                <div id="firstItem" style={{ backgroundColor: "red" }}></div>
                <div>
                  <div className='index' style={{ backgroundColor: "red", color: "red" }}>{index + 1} </div>
                  <div className='text' style={{ color: "red" }}>{result}</div>
                </div>
              </React.Fragment>
            )
          } else if (array.length - 1 === index) {
            return <div key={this.generateKey("lastItem", index)} id='lastItem' style={checkOut === index ? { backgroundColor: "red", color: "red" } : null}></div>
          } else {
            return (<React.Fragment key={this.generateKey("item", index)}>
              <div className='item' style={checkOut >= index ? { backgroundColor: "red" } : null}></div>
              <div>
                <div className='index' style={checkOut >= index ? { backgroundColor: "red", color: "red" } : null} >{index + 1} </div>
                <div className='text' style={checkOut >= index ? { color: "red" } : null}>{result}</div>
              </div>
            </React.Fragment>
            )
          }

        })}
      </div >
    )

  }
}

