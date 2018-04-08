/**
 * 
 */
import React, {Component} from 'react';
import "../css/PublishPins.css";
import ScrollArea from 'react-scrollbar';
import DateTimePicker from 'react-datetime-picker'
import {Accordian,PanelGroup, Panel} from 'react-bootstrap'; 
import NumericInput from 'react-numeric-input';

class PublishPins extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    render() {

        // first dynamically render a Panel for each coupon pin location 
        var pins = this.state.unPublishedPins.map((pin, i) => { 
            return (
                <Panel eventKey={i} key={i} className='publishPanel'>
                    <Panel.Heading>
                        <Panel.Title toggle onClick={() => this.props.onSelectTemplate(pin)}>{pin.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>

                        <span htmlFor="">
                        {pin.description}
                        </span> 

                        <hr/>

                        <span htmlFor="">
                        {pin.instructions}
                        </span> 

                        <hr/>

                        <label htmlFor="">
                            Quantity <br/>
                            {/* <input type="number" */}
                                {/* min="1" */}
                            <NumericInput
                                className="publishQuantityInput"
                                min="1"
                                // style={ false }
                                onChange={(valueAsNumber) => {
                                    this.setState({
                                        unPublishedPins: this.state.unPublishedPins.map((pin, index)=>{
                                            if (index === i) {
                                                return {
                                                    ...pin,
                                                    currentQuantity: valueAsNumber,
                                                    quantity: valueAsNumber
                                                };
                                            } else return pin;
                                        })
                                    },  ()=>  {
                                            this.props.onValuesChange(this.state.unPublishedPins[i].currentQuantity, i, 'currentQuantity');
                                            this.props.onValuesChange(this.state.unPublishedPins[i].quantity, i, 'quantity');
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
                                            this.props.onValuesChange(this.state.unPublishedPins[i].preViewingDate, i, 'preViewingDate');
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
                                            this.props.onValuesChange(this.state.unPublishedPins[i].collectStartDate, i, 'collectStartDate');
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
                                            this.props.onValuesChange(this.state.unPublishedPins[i].collectEndDate, i, 'collectEndDate');
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
                                            this.props.onValuesChange(this.state.unPublishedPins[i].redeemStartDate, i, 'redeemStartDate');
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
                                            this.props.onValuesChange(this.state.unPublishedPins[i].redeemEndDate, i, 'redeemEndDate');
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