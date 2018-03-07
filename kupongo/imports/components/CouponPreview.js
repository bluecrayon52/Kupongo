/**
 * Represents component to preview a coupon. Main use as the view for the infowindow of a coupon pinned or
 * preview of template.
 */
import React, {Component} from 'react';
import '../css/CouponPreview.css';

class CouponPreview extends Component {
  render() {
    return (
        <div>
          <div className="couponTitle">
            <p>{this.props.coupon.title}</p>
          </div>
          <p>{this.props.coupon.description}</p>
        </div>
    );
  }
}

export default CouponPreview;
