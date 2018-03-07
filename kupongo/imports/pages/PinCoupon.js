/**
 * Page for the user to pin coupons on a map.
 */
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import '../css/PinCoupon.css';
import "../css/Popup.css"
import PinCouponMap from '../components/PinCouponMap';
import TemplatesView from '../components/TemplatesView';
import CouponTemplate, {CouponTemplateDB} from '../api/CouponTemplate';
import {CouponDB} from '../api/Coupon';
import Popup from 'react-popup';
import Header from '../components/Header';

class PinCoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.templates = this.props.templates;
    console.log('props to', this.props.templates);
    this.state.selectedTemplate = null;
    this.state.pins = [];
    this.render = this.render.bind(this);
  }

  render() {
    return (
        <div>
          <Header/>
          <Popup/>
          <h1>Pin your coupons</h1>

          <p>Select a template and click on the map place the coupon.</p>

          <div className="pinningContainer">
            <TemplatesView
                templates={this.state.templates}
                selectedTemplate={this.state.selectedTemplate}
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

  // TODO(david): Remove once template database is all ready for use.
  fetchTemplatesForUser() {
    return [
      new CouponTemplate({
        _id: '12nsdf',
        company: 'Coke',
        upcCode: '25OFF',
        description: '25% off your next coke!',
        title: 'Coke for 25% off',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      }),
      new CouponTemplate({
        _id: '843nv',
        company: 'Coke',
        upcCode: '10OFF',
        description: '25% off your next coke!',
        title: 'Coke for 10% off',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      }),
      new CouponTemplate({
        _id: 'skdand',
        company: 'Coke',
        upcCode: 'FREECOKEBABY',
        description: 'One whole free coke!',
        title: 'FREE COKE',
        instances: 10,
        experiationDate: new Date('March 30, 2018')
      })
    ];
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      templates: newProps.templates || this.state.templates
    });
  }

  // TODO(david): Send request to server to save this.state.pins to mongoDB as a Coupon collection.
  publishCoupons() {
    for (let coupon of this.state.pins) {
      CouponDB.insert(coupon.toMongoDoc());
    }

    this.setState({
      pins: []
    });
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
      if (item.templateId === templates[index]._id) {
        item.template = template;
        item.copyTemplateInfo(template);
      }
      return item;
    });

    // TODO(david): Add logic to update changes in database.

    let isSelected = this.state.selectedTemplate._id === this.state.templates[index].id;

    templates[index] = template;

    this.setState({
      templates: templates,
      selectedTemplate: isSelected ? template : this.state.selectedTemplate,
      pins: pins
    });
  }

  removeTemplate(index) {
    let templates = [...this.state.templates];
    let pins = [...this.state.pins];
    let isSelected = false;
    if (this.state.selectedTemplate !== null)
      isSelected = this.state.selectedTemplate._id === templates[index]._id;
    pins = pins.filter((item) => item.templateId !== templates[index]._id);

    CouponTemplateDB.remove({
      _id: templates[index]._id
    });

    templates.splice(index, 1);


    this.setState({
      templates: templates,
      selectedTemplate: isSelected ? null : this.state.selectedTemplate,
      pins: pins
    });
  }

  addTemplate(template) {
    let templates = [...this.state.templates];

    // TODO(david): Placeholder value, update to user company once login portion is done.
    template.company = 'Coke';
    template._id = CouponTemplateDB.insert(template.toMongoDoc());
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

export default withTracker(() => {
  Meteor.subscribe('CouponTemplate');
  return {
    templates: CouponTemplateDB.find({
      // TODO(david): Change to look for current user's company name/id
      company: 'Coke'
    }).fetch()
  };
})(PinCoupon);