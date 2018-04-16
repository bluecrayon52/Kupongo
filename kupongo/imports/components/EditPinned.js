/**
 * Renders pinned coupons in order for viewing and editing.
 */

import React, {Component} from 'react';
import "../css/EditPinned.css";
import ScrollArea from 'react-scrollbar';
import DateTimePicker from 'react-datetime-picker'

class EditPinned extends Component {
  constructor(props) {
    super(props);

    this.state = {...this.props};
  }

  render() {
    return (
        <div className="editPinnedContainer">
          <ScrollArea
              className="scrollArea"
              contentClassName="content"
              smoothScrolling={true}
              horizontal={false}
          >
            <label htmlFor="">
              Title <br/>
              <input type="text"
                     className="pinTextInput"
                     onChange={(change) => {
                       this.setState({title: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
              value={this.state.title}/>
            </label>

            <label htmlFor="">
              Description <br/>
              <textarea className="pinTextInputArea"
                     onChange={(change) => {
                       this.setState({description: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
              value={this.state.description}/>
            </label>

            <label htmlFor="">
              Instructions <br/>
              <textarea className="pinTextInputArea"
                     onChange={(change) => {
                       this.setState({instructions: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
              value={this.state.instructions}/>
            </label>

            <label htmlFor="">
              Quantity <br/>
              <input type="number"
                     className="pinTextInput"
                     onChange={(change) => {
                       this.setState({quantity: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
              value={this.state.quantity}/>
            </label>
            
            <br/>
            <div className="dateContainer">
              Preview Date:<br/>
              <DateTimePicker className="dateTimePicker5"
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({preViewingDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
              value={this.state.preViewingDate}/>
            </div>

            <br/>
            <div className="dateContainer">
              Collection Start Date:<br/>
              <DateTimePicker className="dateTimePicker4"
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({collectStartDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
              value={this.state.collectStartDate}/>
            </div>

            <br/>
            <div className="dateContainer">
              Collection End Date:<br/>
              <DateTimePicker className="dateTimePicker3"
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({collectEndDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
              value={this.state.collectEndDate}/>
            </div>

            <br/>
            <div className="dateContainer">
              Redemption Start Date:<br/>
              <DateTimePicker className="dateTimePicker2"
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({redeemStartDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
              value={this.state.redeemStartDate}/>
            </div>

            <br/>
            <div className="dateContainer">
              Redemption End Date:<br/>
              <DateTimePicker className="dateTimePicker"
                  minDate={new Date()}
                  dropUp
                  onChange={(date) => {
                    this.setState({redeemEndDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
              value={this.state.redeemEndDate}/>
            </div>
            
            <div className='dateSeparator'></div> 
          </ScrollArea>
        </div>
    );
  }
}

export default EditPinned;