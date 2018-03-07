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
          <p>Select template to pin.</p>
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
                  <div className="singleTemplate"
                       key={template._id}
                  >
                    <div className={classes}
                         onClick={() => this.props.onSelectTemplate(template)}>
                      <div className="templateTitle">
                        {template.title}
                      </div>
                      <p>{template.description}</p>
                    </div>
                    <div className="templateTools">
                      <button className="tool"
                              onClick={() => {
                                Popup.plugins().editTemplate(template, (values) => {
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
          callback(values);
          Popup.close();
        }
      }]
    }
  });
});

Popup.registerPlugin('editTemplate', function (template, callback) {
  let values = {};
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
          callback(values);
          Popup.close();
        }
      }]
    }
  });
});

export default TemplatesView;
