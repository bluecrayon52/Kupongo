/**
 * Renders pinned counpon pinned in order for viewing and editing.
 */

import React, {Component} from 'react';
import '../css/PinnedView.css';
import EditPinned from './EditPinned';
import Popup from 'react-popup';
import ScrollArea from 'react-scrollbar';
import Coupon from '../api/Coupon';

class PinnedView extends Component {

  constructor(props) {
    super(props);
    this.props.pinned = this.props.pinned || [];
    this.render = this.render.bind(this);
  }

  render() {
    return (
        <div className="pinnedContainer">
          <h2>Pinned Coupons</h2>
          <p>Select a coupon pin for details.</p>
          <ScrollArea
              className="area"
              contentClassName="content"
              style={{
                height: '500px'
              }}
              smoothScrolling={true}
              horizontal={false}
          >
            {this.props.pinned.map((pin, index) => {
              let selected = (this.props.selectedPin && this.props.selectedPin._id === pin._id) ? 'selected' : '';
              let classes = `${selected} couponpinContainer `;
              return (
                  <div className="singlepin" key={pin._id}>
                    <div className={classes} onClick={() => this.props.onSelectPin(pin)}>
                      <div className="pinTitle">{pin.title}</div>
                      <p className="pinDescription">{pin.description}</p>
                    </div>

                    <div className="pinTools">
                      <button className="tool"
                              onClick={() => {
                                Popup.plugins().editPin(pin, (values) => {
                                  this.props.updatePin(index, new Coupon(values));
                                });
                              }}
                      >Edit
                      </button>

                      <button className="tool"
                              onClick={() => {
                                // TODO(nathan): Add "are you sure" prompt.
                                this.props.removePin(index);
                              }}
                      >Delete
                      </button>
                    </div>
                  </div>
              );
            })}
          </ScrollArea>
        </div>
    );
  }
}

Popup.registerPlugin('editPin', function (pin, callback) {
  let values = {};
  // TODO(david): Try to change this so that only the values that were changed are updated and not copy the entire object.
  let onValuesChange = (newValues) => {
    values = newValues;
  };
  this.create({
    title: 'Edit Pinned Coupon ',
    content: <EditPinned
        {...pin}
        onValuesChange={onValuesChange}
    />,
    buttons: {
      left: ['cancel'],
      right: [{
        text: 'Save Coupon',
        className: 'saveCouponButton',
        action: () => {
          callback(values);
          Popup.close();
        }
      }]
    }
  });
});

export default PinnedView;