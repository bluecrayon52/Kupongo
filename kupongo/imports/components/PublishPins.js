/**
 * 
 */
import React, {Component} from 'react';
import "../css/PublishPins.css";
import ScrollArea from 'react-scrollbar';
import DateTimePicker from 'react-datetime-picker'
import {Accordian,PanelGroup, Panel} from 'react-bootstrap'; 

class PublishPins extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    render() {
        // console.log('[PublishPins]: render, this.state.unPublishedPins[0].title: '+this.state.unPublishedPins[0]._id);
        // first dynamically render a Panel for each coupon pin location 
        var pins = this.state.unPublishedPins.map((pin, i) => {    
            return (
                <Panel eventKey={i} key={i}>
                    <Panel.Heading>
                        <Panel.Title toggle>{pin.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>

                        {/* <label htmlFor="">
                            Title <br/>
                            <input type="text"
                                className="publishTextInput"
                                onChange={(change) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index) => {
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    title: change.target.value
                                                };
                                            } else return pin; 
                                        })
                                    },  () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                        });
                                }}
                            value={pin.title}/>
                        </label> */}
                       
                        {/* <label htmlFor="">
                            Description <br/>
                            <textarea className="publishTextInputArea"
                                onChange={(change) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    description: change.target.value
                                                };
                                            } else return pin;
                                        })
                                    },  ()=>  {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                        });
                                }}
                            value={pin.description}/>
                        </label> */}

                        <span htmlFor="">
                        {pin.description}
                        </span> 

                        <hr/>
                        {/* <label htmlFor="">
                            Instructions <br/>
                            <textarea className="publishTextInputArea"
                                onChange={(change) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    instructions: change.target.value
                                                };
                                            } else return pin;
                                        })
                                    },  ()=>  {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                        });
                                }}
                            value={pin.instructions}/>
                        </label> */}

                        <span htmlFor="">
                        {pin.instructions}
                        </span> 

                        <hr/>

                        <label htmlFor="">
                            Quantity <br/>
                            <input type="number"
                                min="1"
                                className="publishTextInput"
                                onChange={(change) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    quantity: change.target.value
                                                };
                                            } else return pin;
                                        })
                                    },  ()=>  {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                        });
                                }}
                            value={pin.quantity || 1}/>
                        </label>

                        <br/>

                        <div className="dateContainer">
                            Preview Date:<br/>
                            <DateTimePicker className="dateTimePicker5"
                                minDate={new Date()}
                                onChange={(date) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    preViewingDate: date
                                                };
                                            } else return pin;
                                        })
                                    }, () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                    });
                                 }}
                            value={pin.preViewingDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Collection Start Date:<br/>
                            <DateTimePicker className="dateTimePicker4"
                                minDate={new Date()}
                                onChange={(date) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    collectStartDate: date
                                                };
                                            } else return pin;
                                        })
                                    }, () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                    });
                                 }}
                            value={pin.collectStartDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Collection End Date:<br/>
                            <DateTimePicker className="dateTimePicker3"
                                minDate={new Date()}
                                onChange={(date) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    collectEndDate: date
                                                };
                                            } else return pin;
                                        })
                                    }, () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                    });
                                 }}
                            value={pin.collectEndDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Redemption Start Date:<br/>
                            <DateTimePicker className="dateTimePicker2"
                                minDate={new Date()}
                                onChange={(date) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    redeemStartDate: date
                                                };
                                            } else return pin;
                                        })
                                    }, () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                    });
                                 }}
                            value={pin.redeemStartDate}/>
                        </div>

                         <br/>

                        <div className="dateContainer">
                            Redemption End Date:<br/>
                            <DateTimePicker className="dateTimePicker"
                                minDate={new Date()}
                                onChange={(date) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin, 
                                                    redeemEndDate: date
                                                };
                                            } else return pin;
                                        })
                                    }, () => {
                                            this.props.onValuesChange(this.state.unPublishedPins);
                                    });
                                 }}
                            value={pin.redeemEndDate}/>
                        </div>
                        <div className='dateSeparator'></div> 
                    </Panel.Body>
                </Panel>
            );
        });
        // then put all of those panels into a PanelGroup 
        return (
        <div className="PublishingContainer">
            {/* Bootstrap default styles required for the PanelGroup*/}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" 
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous">
            </link>

            <ScrollArea
                className="scrollArea"
                contentClassName="content"
                smoothScrolling={true}
                horizontal={false}
            >
                <PanelGroup accordion id="accordion-example">
                    {pins}
                </PanelGroup>

            </ScrollArea>
        </div>
        );
    }
}
export default PublishPins;