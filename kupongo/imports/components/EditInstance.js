import React, {Component} from 'react';
import "../css/EditInstance.css";
import DatePicker from 'react-date-picker';


class EditInstance extends Component {
  constructor(props) {
    super(props);

    this.state = {
        _id: this.props._id,
        companyName: this.companyName,
        upcCode: this.props.upcCode || '',
        qrImage: this.props.qrImage || '',
        couponImage: this.props.couponImage || '',      
        description: this.props.description || '',      // editable 
        title: this.props.title || '',                  // editable 
        instructions: this.props.instructions || '',    // editable 
        productCtgs: this.props.productCtgs || [],
        layout: this.props.layout || '',
        upperLat: this.props.upperLat,
        lowerLat: this.props.lowerLat,
        eastLong: this.props.eastLong,
        westLong: this.props.westLong,
        quantity: this.props.quantity,                  // editable 
        preViewingDate: this.props.preViewingDate,      // editable 
        collectStartDate: this.props.collectStartDate,  // editable 
        collectEndDate: this.props.collectEndDate,      // editable 
        redeemStartDate: this.props.redeemStartDate,    // editable 
        redeemEndDate: this.props.redeemEndDate         // editable 
    };
  }

  render() {
    return (
        <div className="editInstanceContainer">
            <label htmlFor="">
                Title <br/>
                <input type="text"
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
                    onChange={(change) => {
                        this.setState({description: change.target.value}, () => {
                            this.props.onValuesChange(this.state);
                         });
                    }}
                   value={this.state.description}/>
            </label>

            <label htmlFor="">
                Instructions <br/>
                <input type="text"
                    onChange={(change) => {
                        this.setState({description: change.target.value}, () => {
                            this.props.onValuesChange(this.state);
                         });
                    }}
                   value={this.state.instructions}/>
            </label>

            <label htmlFor="">
                Quantity <br/>
                <input type="text"
                    onChange={(change) => {
                        this.setState({description: change.target.value}, () => {
                            this.props.onValuesChange(this.state);
                         });
                    }}
                   value={this.state.instructions}/>
            </label>

            <div className="dateContainer">
                <p>Preview Date:</p>
                    <DatePicker
                            minDate={new Date()}
                            onChange={(date) => {
                                this.setState({expirationDate: date}, () => {
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
                                this.setState({expirationDate: date}, () => {
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
                                this.setState({expirationDate: date}, () => {
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
                                this.setState({expirationDate: date}, () => {
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
                                this.setState({expirationDate: date}, () => {
                                    this.props.onValuesChange(this.state);
                                });
                            }}
                        value={this.state.redeemEndDate}
                     />
            </div>

         
        </div>
    );
  }
}

export default EditTemplate;