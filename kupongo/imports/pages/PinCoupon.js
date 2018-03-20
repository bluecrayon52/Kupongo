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
import Coupon, {CouponDB} from '../api/Coupon';
import Popup from 'react-popup';
import Header from '../components/Header';
import PublishPins from '../components/PublishPins';

class PinCoupon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Placeholder name until user back-end is done.
      salesInfo: this.props.salesInfo  || {
        _id: 'safns',
        companyName: 'Coke'
      }
    };
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

          <p>Select a template and click on the map to place the coupon.</p>

          <div className="pinningContainer">
          
            <TemplatesView
                templates={this.state.templates}
                salesInfo={this.state.salesInfo}
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
                onClick={() => {
                  console.log('[PinCoupon]: onClick Publish pin this.state.pins[0].title: '+this.state.pins[0].title);
                  let unpublishedPins = this.state.pins;
                  console.log('[PinCoupon]: onClick Publish pins unpublishedPins[0]: '+unpublishedPins[0].title);
                  Popup.plugins().newCoupons(unpublishedPins, (pinsToPublish) => {
                    console.log('[PinCoupon]: onClick Publish pins newCoupon callback pinsToPublish[0].title: '+pinsToPublish[0].title);
                    this.state.pins = pinsToPublish;
                    console.log('[PinCoupon]: onClick Publish pins newCoupon callback this.state.pins[0].title: '+this.state.pins[0].title);
                    this.publishCoupons(); 
                  });
                }}
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
      console.log('[PinCoupon]: publishCoupons calling insertCoupon for coupon.title: ' +coupon.title);
      Meteor.call('insertCoupon', this.state.salesInfo._id, coupon.toMongoDoc());
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

  // remove a coupon template independently from pinned coupons
  removeTemplate(index) {
    let templates = [...this.state.templates];
    console.log('[PinCoupon]: removeTemplate, templates[index].title: '+templates[index].title);
    Meteor.call('removeCouponTemplate', this.state.salesInfo._id, templates[index]);

    // remove the template from the client side array
    templates.splice(index, 1);

    this.setState({
      templates: templates,
    });
  }

  addTemplate(template) {
    console.log('[PinCoupon]: addTemplate, title: '+ template.title);
    let templates = [...this.state.templates];

    Meteor.call('insertCouponTemplate', this.state.salesInfo._id, template.toMongoDoc(), (err, result) => {
      console.log('[PinCoupon]: insertCouponTemplate result: '+result+', err: '+err);
      template._id = result;
    });
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

  // === Popup prompts =====
  Popup.registerPlugin('newCoupons', function (unPublishedPins, callback) {
   console.log('[PinCoupon]: Popup newCoupons unPublishedPins[0].title: '+unPublishedPins[0].title);

    let onValuesChange = (newValues) => {
      unPublishedPins = newValues;
    };

    this.create({
      title: 'Publish Coupons',
      content: <PublishPins
          onValuesChange={onValuesChange}
          unPublishedPins={unPublishedPins}
      />,
      buttons: {
        left: ['cancel'],
        right: [{
          text: 'Save Coupons',
          className: 'saveCouponsButton',
          action: () => {
            console.log('[PinCoupon]: Popup newCoupons saveCouponsButton');
            callback(unPublishedPins);
            Popup.close();
          }
        }]
      }
    });
  });

export default withTracker(() => {
  // TOOD(david): Change this to use logged in user's ID once that is ready.
  Meteor.subscribe('CouponTemplate','safns');
  return {
    templates: CouponTemplateDB.find({
      // TODO(david): Change to look for current user's company name/id
      companyName: 'Coke'
    }).fetch()
  };
})(PinCoupon);