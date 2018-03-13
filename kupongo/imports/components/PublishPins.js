/**
 * 
 */
import React, {Component} from 'react';
import "../css/PublishPins.css";
import ScrollArea from 'react-scrollbar';
import DateTimePicker from 'react-datetime-picker'

class PublishPins extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props};
    }
    render() {
        return (
        <div className="PublishingContainer">
        <ScrollArea
              className="scrollArea"
              contentClassName="content"
              smoothScrolling={true}
              horizontal={false}
          >
        <label htmlFor=""> Let's Publish Some Pins!</label>
         </ScrollArea>
        </div>
        );
    }
}
export default PublishPins;