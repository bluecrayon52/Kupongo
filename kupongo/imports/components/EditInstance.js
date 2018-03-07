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
        description: this.props.description || '',
        title: this.props.title || '',
        instructions: this.props.instructions || '',
        productCtgs: this.props.productCtgs || [],
        layout: this.props.layout || '',
        upperLat: this.props.upperLat,
        lowerLat: this.props.lowerLat,
        eastLong: this.props.eastLong,
        westLong: this.props.westLong,
        quantity: this.props.quantity,
        preViewingDate: this.props.preViewingDate,
        collectStartDate: this.props.collectStartDate,
        collectEndDate: this.props.collectEndDate,
        redeemStartDate: this.props.redeemStartDate,
        redeemEndDate: this.props.redeemEndDate
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

          <div className="discountCodeContainer">
            <label htmlFor="">
              UPC Code <br/>
              <input type="text"
                     onChange={(change) => {
                       this.setState({upcCode: change.target.value}, () => {
                         this.props.onValuesChange(this.state);
                       });
                     }}
                     value={this.state.upcCode}/></label>
            OR
            <label htmlFor="">
              QR Image <br/>
              {/* TODO(david): Add a way to save images to MongoDB, right now this does nothing. */}
              <input type="file" accept="image/*"/></label>
          </div>

          <label htmlFor="">
            Number of times it can be collected:
            <input type="number"
                   onChange={(change) => {
                     this.setState({instances: change.target.value}, () => {
                       this.props.onValuesChange(this.state);
                     });
                   }}
                   value={this.state.instances}/>
          </label>


          <div className="expirationContainer">
            <p>Experiation Date:</p>
            <DatePicker
                minDate={new Date()}
                onChange={(date) => {
                  this.setState({
                    expirationDate: date
                  }, () => {
                    this.props.onValuesChange(this.state);
                  });
                }}
                value={this.state.expirationDate}
            />
          </div>

          {/* TODO(david): Start adding input for rest of fields here. */}
        </div>
    );
  }
}

export default EditTemplate;