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
        console.log('[PublishPins]: render, this.state.unPublishedPins[0].title: '+this.state.unPublishedPins[0].title);
        // first dynamically render a Panel for each coupon pin location 
        var pins = this.state.unPublishedPins.map(function(pin, i){    
            return (
                <Panel eventKey={i}>
                    <Panel.Heading>
                        <Panel.Title toggle>{pin.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                            {pin.description}
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