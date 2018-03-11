/**
 * Renders pinned coupons in order for viewing and editing.
 */

import React, {Component} from 'react';
import "../css/EditPinned.css";
import DatePicker from 'react-date-picker';
import ScrollArea from 'react-scrollbar';


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
                     className="templateTextInput"
                     onChange={(change) => {
                       this.setState({title: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
                     value={this.state.title}/>
            </label>

            <label htmlFor="">
              Description <br/>
              <input type="text"
                     className="templateTextInput"
                     onChange={(change) => {
                       this.setState({description: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
                     value={this.state.description}/>
            </label>

            <label htmlFor="">
              Instructions <br/>
              <textarea className="templateTextInputArea"
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
                     className="templateTextInput"
                     onChange={(change) => {
                       this.setState({quantity: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
                     value={this.state.quantity}/>
            </label>

            {/* Date picker needs a lot of room so this serves to create space for that component. */}
            <div className="dateSeparator">
              Select dates below:
            </div>

            <div className="dateContainer">
              <p>Preview Date:</p>
              <DatePicker
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({preViewingDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
                  value={this.state.preViewingDate}
              />
            </div>
            <div className="dateContainer">
              <p>Collection Start Date:</p>
              <DatePicker
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({collectStartDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
                  value={this.state.collectStartDate}
              />
            </div>
            <div className="dateContainer">
              <p>Collection End Date:</p>
              <DatePicker
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({collectEndDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
                  value={this.state.collectEndDate}
              />
            </div>
            <div className="dateContainer">
              <p>Redemption Start Date:</p>
              <DatePicker
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({redeemStartDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
                  value={this.state.redeemStartDate}
              />
            </div>
            <div className="dateContainer">
              <p>Redemption End Date:</p>
              <DatePicker
                  minDate={new Date()}
                  onChange={(date) => {
                    this.setState({redeemEndDate: date}, () => {
                      this.props.onValuesChange(this.state);
                    });
                  }}
                  value={this.state.redeemEndDate}
              />
            </div>

          </ScrollArea>
        </div>
    );
  }
}

export default EditPinned;