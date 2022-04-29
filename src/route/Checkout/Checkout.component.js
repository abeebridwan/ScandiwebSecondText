import PropTypes from 'prop-types';
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component.js"
import ContentWrapper from 'SourceComponent/ContentWrapper';
import './Checkout.override.style.scss'

import ProgressBar from './ProgressBar';


export class Checkout extends SourceCheckout {

  render() {
    return (
      <main block="Checkout">
        <ProgressBar steps={this.stepMap} checkoutStep={this.props.checkoutStep} />
        <ContentWrapper
          wrapperMix={{ block: 'Checkout', elem: 'Wrapper' }}
          label={__('Checkout page')}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }

}

export * from "SourceRoute/Checkout/Checkout.component.js"
export default Checkout;

