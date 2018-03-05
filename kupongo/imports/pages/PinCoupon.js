/**
 * Page for the user to pin coupons on a map.
 */
import React, {Component} from 'react';
import '../css/PinCoupon.css';
import "../css/Popup.css"
import PinCouponMap from '../components/PinCouponMap';
import TemplatesView from '../components/TemplatesView';
import CouponTemplate from '../api/CouponTemplate';
import Popup from 'react-popup';


export default class PinCoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.templates = this.fetchTemplatesForUser();
    this.state.selectedTemplate = null;
    this.state.pins = [];
    this.render = this.render.bind(this);
  }

  render() {
    return (
        <div>
          <Popup/>
          <h1>Pin your coupons</h1>

          <p>Select a template and click on the map place the coupon.</p>

          <div className="pinningContainer">
            <TemplatesView
                templates={this.state.templates}
                updateTemplate={this.updateTemplate.bind(this)}
                removeTemplate={this.removeTemplate.bind(this)}
                addTemplate={this.addTemplate.bind(this)}
                onSelectTemplate={this.selectTemplate.bind(this)}
            />
            <PinCouponMap
                onRemovePin={this.removePin.bind(this)}
                onDragEnd={this.updatePin.bind(this)}
                addPin={this.addPin.bind(this)}
                pins={this.state.pins}
                selectedTemplate={this.state.selectedTemplate}
            />
          </div>
          <div className="mapTools">
            <button
                onClick={this.publishCoupons.bind(this)}
            >Publish pins
            </button>
          </div>
        </div>
    );
  }

  // TODO(david): Change to query for templates the user has made. Using dummy data for now.
  fetchTemplatesForUser() {
    return [
      new CouponTemplate({
        company: 'Coke',
        upcCode: '25OFF',
        description: '25% off your next coke!',
        title: 'Coke for 25% off',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      }),
      new CouponTemplate({
        company: 'Coke',
        upcCode: '10OFF',
        description: '25% off your next coke!',
        title: 'Coke for 10% off',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      }),
      new CouponTemplate({
        company: 'Coke',
        upcCode: 'FREECOKEBABY',
        description: 'One whole free coke!',
        title: 'FREE COKE',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      })
    ];
  }

  // TODO(david): Send request to server to save this.state.pins to mongoDB as a Coupon collection.
  publishCoupons() {
  }

  selectTemplate(template) {
    this.setState({
      selectedTemplate: template
    });
  }

  updateTemplate(index, template) {
    let templates = [...this.state.templates];

    // Update the pins to reflect this change.
    let pins = [...this.state.pins];
    pins = pins.map((item) => {
      if (item.template === templates[index])  {
        item.template = template;
        item.title = template.title;
        item.description = template.description;
      }
      return item;
    });

    templates[index] = template;



    this.setState({
      templates: templates,
      selectedTemplate: this.state.selectedTemplate === this.state.templates[index] ? template : this.state.selectedTemplate,
      pins: pins
    });
  }

  removeTemplate(index) {
    let templates = [...this.state.templates];
    let pins = [...this.state.pins];
    pins = pins.filter((item) => item.template !== templates[index]);
    templates.splice(index, 1);

    this.setState({
      templates: templates,
      selectedTemplate: this.state.selectedTemplate === this.state.templates[index] ? null : this.state.selectedTemplate,
      pins: pins
    });
  }

  addTemplate(template) {
    let templates = [...this.state.templates];
    templates.push(template);
    this.setState({
      templates: templates
    });
  }

  updatePin(index, newPin) {
    let pins = [...this.state.pins];
    pins[index] = newPin;
    this.setState({
      pins: pins
    });
  }

  removePin(index) {
    let pins = [...this.state.pins];
    pins.splice(index, 1);
    this.setState({
      pins: pins
    });
  }

  addPin(pin) {
    let pins = [...this.state.pins];
    pins.push(pin);
    this.setState({
      pins: pins
    });
  }

}