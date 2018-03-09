import React, {Component} from 'react';
import "../css/EditTemplate.css";
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ScrollArea from 'react-scrollbar';

// this array is for testing the product categories dropdown, ripped off of amazon product catergories
const options = ['None','Clothing & Accessories', 'Electronics', 'Grocery & Gourmet Food', 'Restaurant and Dinning', 'Automotive & Powersports',
'Baby Products', 'Beauty', 'Books', 'Business Products', 'Camera & Photo', 'Cell Phones', 'Fashion Jewelry', 'Fine Jewelry', 'Fine Art', 'Handmade', 
'Health & Personal Care', 'Home & Garden', 'Industrial & Scientific', 'Luggage & Travel Accessories', 'Music', 'Musical Instruments', 'Office Products', 
'Outdoors', 'Personal Computers', 'Professional Services', 'Shoes, Handbags & Sunglasses', 'Software & Computer Games', 'Sports', 'Tools & Home Improvement', 
'Toys & Games', 'Video Games & Video Game Consoles']; 

class EditTemplate extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
      _id:          this.props._id,
      salesID:      this.props.salesID,
      companyName:  this.props.companyName,
      upcCode:      this.props.upcCode || '',        // editable 5
      qrImage:      this.props.qrImage,              // editable 6
      couponImage:  this.props.couponImage || [],    // editable 7
      description:  this.props.description || '',    // editable 2
      title:        this.props.title || '',          // editable 1
      instructions: this.props.instructions || '',   // editable 3
      productCtg:   this.props.prouctCtg || '',      // editable 4
      layout:       this.props.layout,               // editable 8 (not used for now)

    };
  }
  
  imageUploadHandler = () => {

  }

  render() {
    return (
        <div className="editTemplateContainer">
        <ScrollArea
              className="scrollArea"
              contentClassName="content"
              smoothScrolling={true}
              horizontal={false}
          >

          <label htmlFor="">
            Title <br/>
            <input className="templateTextInput" type="text"
              onChange={(change) => {
                this.setState({title: change.target.value}, () => {
                  this.props.onValuesChange(this.state);
                });
              }}
            value={this.state.title}/>
          </label>

          <label htmlFor="">
            Description <br/>
              <textarea className="templateTextInputLong"
                onChange={(change) => {
                  this.setState({description: change.target.value}, () => {
                    this.props.onValuesChange(this.state);
                  });
                }}
              value={this.state.description}/>
          </label>
          
          <label htmlFor="">
            Instructions<br/>
              <textarea className="templateTextInputLong" 
                onChange={(change) => {
                  this.setState({instructions: change.target.value}, () => {
                    this.props.onValuesChange(this.state);
                  });
                }}
              value={this.state.instructions}/>
          </label>
          
          <label htmlFor="">
            Product Category<br/>
              <Dropdown options={options} 
                onChange={(option) => {
                  this.setState({prouctCtg: option}, () => {
                    this.props.onValuesChange(this.state);
                  });
                }} 
              value={this.state.prouctCtg} placeholder="Select an Option" />
          </label>

          <br/>
          <label htmlFor="">
            UPC Code <br/>
              <input className="templateTextInput" type="text"
                onChange={(change) => {
                  this.setState({upcCode: change.target.value}, () => {
                    this.props.onValuesChange(this.state);
                  });
                }}
              value={this.state.upcCode}/>
          </label>
          
          <br/>
          <label htmlFor="">
            QR Image <br/>
              {/* TODO: Add a way to save images to MongoDB, right now this does nothing. */}
              <input style= {{display:'none'}} type="file" accept="image/*" 
                onChange={(event) => {
                  var file = event.target.files[0];
                  console.log(file); 
                  var reader = new FileReader();
                  var url = reader.readAsDataURL(file);
                  reader.onloadend=(e) => {
                    this.setState({
                      qrImage: [reader.result]
                    });
                    console.log(this.state.qrImage);
                  }    
                }} 
              ref={fileInput => this.fileInput = fileInput}/>
              {/* preview the image before saving */}
               <img src={this.state.qrImage} width='300' />
               <br/>
              <button onClick={()=> this.fileInput.click()}>Choose Image</button>
          </label>

          <br/>
          <label htmlFor="">
            Coupon Image <br/>
              {/* TODO: Add a way to save images to MongoDB, right now this does nothing. */}
              <input style= {{display:'none'}} type="file" accept="image/*"
                onChange={(event) => {
                  var file = event.target.files[0];
                  console.log(file);
                  var reader = new FileReader();
                  var url = reader.readAsDataURL(file);
                  reader.onloadend=(e) => {
                    this.setState({
                      couponImage: [reader.result]
                    });
                    console.log(this.state.couponImage);
                  }
                }} 
              ref={fileInput2 => this.fileInput2 = fileInput2}/>
              {/* preview the image before upload */}
              <img src={this.state.couponImage} width='300' /> 
              <br/>
              <button onClick={()=> this.fileInput2.click()}>Choose Image</button>
          </label>

          {/* TODO(david): Start adding input for rest of fields here. */}
          </ScrollArea>
        </div>
    );
  }
}

export default EditTemplate;