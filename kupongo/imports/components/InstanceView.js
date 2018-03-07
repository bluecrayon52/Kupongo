/**
 * Renders pinned counpon instances in order for viewing and editing.
 */
import React, {Component} from 'react';
import '../css/InstanceView.css';
import EditInstance from './EditInstance';
import Popup from 'react-popup';
import ScrollArea from 'react-scrollbar';
import Coupon from '../api/Coupon';

class InstanceView extends Component {

    constructor(props) {
        super(props);
        this.props.instances = this.props.instances || [];
        this.render = this.render.bind(this);
      }
    
      render() {
        return (
            <div className="instanceContainer">
              {/* <h2>Pinned Coupons</h2> */}
              <p>Select a coupon instance for details.</p>
              <ScrollArea
                  className="area"
                  contentClassName="content"
                  style={{
                    height: '500px'
                  }}
                  smoothScrolling={true}
                  horizontal={false}
              >
                {this.props.instances.map((instance, index) => {
                  let selected = (this.props.selectedInstance !== null && this.props.selectedInstance._id === instance._id) ? 'selected' : '';
                  let classes = `${selected} couponInstanceContainer `;
                  return (
                      <div className="singleInstance"
                           key={instance._id}
                      >
                        <div className={classes}
                             onClick={() => this.props.onSelectInstance(instance)}>
                          <div className="instanceTitle">
                            {instance.title}
                          </div>
                          <p>{instance.description}</p>
                        </div>
                        <div className="instanceTools">
                          <button className="tool"
                                  onClick={() => {
                                    Popup.plugins().editInstance(instance, (values) => {
                                      this.props.updateInstance(index, new Coupon(values));
                                    });
                                  }}
                          >Edit
                          </button>
                          <button className="tool"
                                  onClick={() => {
                                    // TODO(nathan): Add "are you sure" prompt.
                                    this.props.removeInstance(index);
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
    
    Popup.registerPlugin('editInstance', function (instance, callback) {
      let values = {};
      let onValuesChange = (newValues) => {
        values = newValues;
      };
      this.create({
        title: 'Edit Pinned Coupon ',
        content: <EditInstance
            {...instance}
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
    
    export default InstanceView;