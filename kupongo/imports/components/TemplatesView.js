/**
 * Renders templates in order for viewing and editing.
 */
import React, {Component} from 'react';
import '../css/TemplatesView.css';
import EditTemplate from './EditTemplate';
import Popup from 'react-popup';
import CouponTemplate from '../api/CouponTemplate';
import ScrollArea from 'react-scrollbar';


class TemplatesView extends Component {

  constructor(props) {
    super(props);
    this.props.tempalates = this.props.templates || [];
    this.render = this.render.bind(this);
  }

  render() {
    return (
        <div className="templateContainer">
          <h2>Coupon Templates</h2>
          <p>Select a template to pin.</p>
          <ScrollArea
              className="area"
              contentClassName="content"
              style={{
                height: '500px'
              }}
              smoothScrolling={true}
              horizontal={false}
          >
            {this.props.templates.map((template, index) => {
              let selected = (this.props.selectedTemplate !== null && this.props.selectedTemplate._id === template._id) ? 'selected' : '';
              let classes = `${selected} couponTemplateContainer `;
              return (
                <div className="singleTemplate" key={template._id}>

                  <div className={classes}  onClick={() => this.props.onSelectTemplate(template)}>
                    <div className="templateTitle">{template.title}</div>
                    <p className="templateDescription">{template.description}</p>
                  </div>

                  <div className="templateTools">
                  
                    <button className="tool"
                      onClick={() => {
                        Popup.plugins().editTemplate(template, (values) => {
                          values.salesInfo = this.props.salesInfo;
                          this.props.updateTemplate(index, new CouponTemplate(values));
                        });
                      }}
                    >Edit
                    </button>

                    <button className="tool"
                      onClick={() => {
                        // TODO(david): Add "are you sure" prompt.
                        this.props.removeTemplate(index);
                      }}
                    >Delete
                    </button>

                  </div>
                </div>
              );
            })}
          </ScrollArea>
          <button
              onClick={() => {
                Popup.plugins().newTemplate((values) => {
                  values.salesInfo = this.props.salesInfo;
                  console.log('[TemplateView] newTemplate callback values.productCtg: ' + values.productCtg);
                  this.props.addTemplate(new CouponTemplate(values));
                });
              }}
          >Create new template
          </button>
        </div>
    );
  }
}

// === Popup prompts =====
Popup.registerPlugin('newTemplate', function (callback) {
  let values = {};
  let errorMessage = '';
  let onValuesChange = (newValues) => {
    values = newValues;
  };
  this.create({
    title: 'Create Template',
    content: <EditTemplate
        onValuesChange={onValuesChange}
    />,
    buttons: {
      left: ['cancel'],
      right: [{
        text: 'Save Template',
        className: 'saveTemplateButton',
        action: () => {
          var isEmpty = Object.keys(values).length === 0;
          if(values.upcCode) {
          var isnum = /^\d+$/.test(values.upcCode);
          var rightLength = values.upcCode.length === 6 |  values.upcCode.length === 12;
          } 
          if(isEmpty) errorMessage ='You must set the title, description, instructions, and upc code!';
          else if (!values.title) errorMessage = 'The title must be set!';
          else if(!values.description) errorMessage = 'The description must be set!';
          else if(!values.instructions) errorMessage = 'The instructions must be set!';
          else if(!values.upcCode) errorMessage = 'The upc code must be set!'
          else if (!isnum) errorMessage = 'The upc code must be all digits!';
          else if (!rightLength) errorMessage = 'The upc code must be either 6 or 12 digits!';
          if(errorMessage) {
            Popup.create({
              title: 'Template Incomplete',
              content: errorMessage
            }, true);
          } else {
              callback(values);
              Popup.close();
            }
        }
      }]
    }
  });
});

Popup.registerPlugin('editTemplate', function (template, callback) {
  let values = template;
  let onValuesChange = (newValues) => {
    values = newValues;
  };
  this.create({
    title: 'Edit Template',
    content: <EditTemplate
        {...template}
        onValuesChange={onValuesChange}
    />,
    buttons: {
      left: ['cancel'],
      right: [{
        text: 'Save Template',
        className: 'saveTemplateButton',
        action: () => {
          var isEmpty = Object.keys(values).length === 0;
          if(values.upcCode) {
          var isnum = /^\d+$/.test(values.upcCode);
          var rightLength = values.upcCode.length === 6 |  values.upcCode.length === 12;
          } 
          if(isEmpty) errorMessage ='You must set the title, description, instructions, and upc code!';
          else if (!values.title) errorMessage = 'The title must be set!';
          else if(!values.description) errorMessage = 'The description must be set!';
          else if(!values.instructions) errorMessage = 'The instructions must be set!';
          else if(!values.upcCode) errorMessage = 'The upc code must be set!'
          else if (!isnum) errorMessage = 'The upc code must be all digits!';
          else if (!rightLength) errorMessage = 'The upc code must be either 6 or 12 digits!';
          if(errorMessage) {
            Popup.create({
              title: 'Template Incomplete',
              content: errorMessage
            }, true);
          } else {
              callback(values);
              Popup.close();
            }
        }
      }]
    }
  });
});



export default TemplatesView;
