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
            j = i +1;
            return (
                <Panel eventKey={i} key={i} className='publishPanel'>
                    <Panel.Heading>
                        <Panel.Title toggle onClick={() => this.props.onSelectTemplate(pin)}>{pin.title+' '+j}</Panel.Title>
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
                            Quantity (defaults to 1)<br/>
                            <NumericInput
                                className="publishQuantityInput"
                                min={1}
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
                                            if(this.state.unPublishedPins[i].currentQuantity){
                                                this.props.onValuesChange(this.state.unPublishedPins[i].currentQuantity, i, 'currentQuantity');
                                            } else {
                                                this.props.onValuesChange(1, i, 'currentQuantity');
                                            }
                                            if(this.state.unPublishedPins[i].quantity){
                                                this.props.onValuesChange(this.state.unPublishedPins[i].quantity, i, 'quantity');
                                            } else {
                                                this.props.onValuesChange(1, i, 'quantity');
                                            }
                                        });
                                }}
                                value={pin.quantity}/>
                        </label>
                        <br/>
                        <div className="dateContainer">
                            Preview Date (default today):<br/>
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
                                            var pVD = new Date(this.state.unPublishedPins[i].preViewingDate);
                                            var today = new Date();
                                            if(pVD.getTime() < today.getTime()){
                                                this.props.onValuesChange(today, i, 'preViewingDate');
                                            } else {
                                                this.props.onValuesChange(pVD, i, 'preViewingDate');
                                            }
                                    });
                                 }}
                            value={pin.preViewingDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Collection Start Date (default today):<br/>
                            <DateTimePicker className="dateTimePicker4"
                                required={true}
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
                                            var cSD = new Date(this.state.unPublishedPins[i].collectStartDate);
                                            var today = new Date();
                                            if(cSD.getTime() < today.getTime()){
                                                this.props.onValuesChange(today, i, 'collectStartDate');
                                            } else {
                                                this.props.onValuesChange(cSD, i, 'collectStartDate');
                                            }
                                    });
                                 }}
                            value={pin.collectStartDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Collection End Date (default today plus 24 hours):<br/>
                            <DateTimePicker className="dateTimePicker3"
                                required={true}
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
                                            var cED = new Date(this.state.unPublishedPins[i].collectEndDate);
                                            var today = new Date();
                                            if (cED.getTime() < today.getTime()){
                                                var todayPlus24 = new Date(today.getTime() + (60*60*24* 1000));
                                                this.props.onValuesChange(todayPlus24, i, 'collectEndDate');
                                            } else {
                                                this.props.onValuesChange(cED, i, 'collectEndDate');
                                            }
                                    });
                                 }}
                            value={pin.collectEndDate}/>
                        </div>

                        <br/>

                        <div className="dateContainer">
                            Redemption Start Date (default today):<br/>
                            <DateTimePicker className="dateTimePicker2"
                                required={true}
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
                                            var rSD = new Date(this.state.unPublishedPins[i].redeemStartDate);
                                            var today = new Date();
                                            if (rSD.getTime() < today.getTime()){
                                                this.props.onValuesChange(today, i, 'redeemStartDate');
                                            } else {
                                                this.props.onValuesChange(rSD, i, 'redeemStartDate');
                                            }
                                    });
                                 }}
                            value={pin.redeemStartDate}/>
                        </div>

                         <br/>

                        <div className="dateContainer">
                            Redemption End Date (default today plus 30 days):<br/>
                            <DateTimePicker className="dateTimePicker"
                                required={true}
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
                                            var rED = new Date(this.state.unPublishedPins[i].redeemEndDate);
                                            var today = new Date();
                                            if(rED.getTime() < today.getTime()) {
                                                var todayPlus30 = new Date(today.getTime() + (60*60*24*30 * 1000));
                                                this.props.onValuesChange(todayPlus30, i, 'redeemEndDate');
                                            } else {
                                                this.props.onValuesChange(rED, i, 'redeemEndDate');
                                            }
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