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
import { Session } from 'meteor/session';

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

  componentWillMount() {
    if (Session.equals('isAuthorized', true)) {
      console.log("User is authorized.")
    } else {
      console.log("User is not authorized.")
      this.props.history.push('/');
    }
  }

  render() {
    return (
        <div>
          <Header
              userInfo={this.props.location.state.userInfo}
          />
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
            <button className='publishBtn'
                onClick={
                  () => {                               
                  let unpublishedPins = this.state.pins;
                  Popup.plugins().newCoupons(unpublishedPins, this, (pinsToPublish) => {
                    this.state.pins = pinsToPublish;
                    this.publishCoupons(); 
                  });
                }
              }
            >Publish pins
            </button>
          </div>
        </div>
    );
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      templates: newProps.templates || this.state.templates
    });
  }

  // TODO(david): Send request to server to save this.state.pins to mongoDB as a Coupon collection.
  publishCoupons() {
    for (let coupon of this.state.pins) {
      coupon = new Coupon(coupon); // turn generic javascript object to Coupon object 
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
    Meteor.call('updateCouponTemplate', this.state.salesInfo._id, this.state.salesInfo.companyName, template._id, template.toMongoDoc(), (err, result) => {
      if (err) {
        console.log('Template update failed.')
      }
    });

    let isSelected = false;
    if (this.state.selectedTemplate)
      isSelected = this.state.selectedTemplate._id === this.state.templates[index]._id;
    
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
    console.log('[PinCoupon] removeTemplate, templates[index].title: '+templates[index].title);
    Meteor.call('removeCouponTemplate', this.state.salesInfo._id, templates[index]);

    // remove the template from the client side array
    templates.splice(index, 1);

    this.setState({
      templates: templates,
    });
  }

  addTemplate(template) {
    console.log('[PinCoupon] addTemplate, title: '+ template.title);
    console.log('[PinCoupon] addTemplate, productCtg: '+ template.productCtg)
    let templates = [...this.state.templates];

    Meteor.call('insertCouponTemplate', this.state.salesInfo._id, template.toMongoDoc(), (err, result) => {
      console.log('[PinCoupon] insertCouponTemplate result: '+result+', err: '+err);
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
    console.log('[PinCoupon] addPin pin.collectEndDate: ' + pin.collectEndDate);
  }
}

  // === Popup prompts =====
  Popup.registerPlugin('newCoupons', function (unPublishedPins, that, callback){
    let temp = unPublishedPins;

    let onValuesChange = (newValue, index, key) => {
      unPublishedPins[index][key] = newValue;
    };

    let getTemp = (index, key) => {
      return temp[index][key];
    };
    
    this.create({
      title: 'Publish Coupons',
      className: 'popover',
      content: <PublishPins
          onValuesChange={onValuesChange}
          unPublishedPins={unPublishedPins}
          onSelectTemplate={that.selectTemplate.bind(that)}
          getTemp={getTemp}
      />,
      noOverlay: true,
      position: function (box) {
        box.style.top  = 160 + 'px';
        box.style.left = 0 + 'px';
        box.style.margin = 0;
        box.style.opacity = 1;
        },
      buttons: {
        left: ['cancel'],
        right: [{
          text: 'Save Coupons',
          className: 'saveCouponsButton',
          action: () => {
            let errorMessage ='';
            let today = new Date().getTime();
            // let's do some validation 
            unPublishedPins.some((pin, i)=>{
              j = i + 1;
              // reset erroneously set preViewingDate
              if (pin.preViewingDate.getTime() > pin.collectStartDate.getTime()) { 
                pin.preViewingDate = pin.collectStartDate;
              } 

              if (pin.collectEndDate.getTime() <= pin.collectStartDate.getTime()) {
                errorMessage = 'At '+pin.title+' '+j+' the collection end date cannot be set before or at the same time as the collection start date!';
                return true;
              }
              else if (pin.redeemStartDate.getTime() < pin.collectStartDate.getTime()) {
                errorMessage = 'At '+pin.title+' '+j+' the redemption start date cannot be set before the collection start date!';
                return true;
              }
              else if (pin.redeemEndDate.getTime() < pin.redeemStartDate.getTime()) {
                errorMessage = 'At '+pin.title+' '+j+' the redemption end date cannot be set before the redemption start date!';
                return true;
              }

            });

            if (errorMessage){
              console.log('errorMessage: ' + errorMessage);
              temp = unPublishedPins;
              Popup.create({
                title: 'Coupon Date Errors',
                content: errorMessage,
                buttons: {
                  right: [{
                    text: 'Ok',
                    action: () => {
                      Popup.close();
                    }
                  }]
                }
              }, true);
            }
            else {
            callback(unPublishedPins);
            Popup.close();
            }
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