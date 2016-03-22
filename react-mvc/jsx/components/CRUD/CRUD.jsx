

define([
    'react',
    'jsx!CRUD/Read',
    'jsx!CRUD/Create',
    'jsx!CRUD/CRUDRedux',
    'CRUD/ReadOptions'
],
function (React, Read, Create, CRUDRedux, ReadOptions) {
    
    var CRUD = React.createClass({
        getInitialState: function () {
            return {
                readOptions: [{
                    variableName: 'name',
                    style: ReadOptions.Heading1
                },
                {
                    variableName: 'description',
                    style: ReadOptions.Paragraph
                },
                {
                    variableName: 'targetGroup',
                    style: ReadOptions.Paragraph,
                    label: 'Target group:',
                    format: (value) => { return value.toString().replace(',', ', ');}
                }],
                formInputs: [{
                    label: 'Name',
                    name: 'name',
                    type: 'text',
                    placeholder: 'type a category name',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Name is missing or to short!',
                    regex: '[a-zA-Z]{4}'
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: 'textarea',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Description is missing!'
                },
                {
                    label: 'Target Group',
                    name: 'targetGroup',
                    type: 'checkbox',
                    alternatives: ['Children', 'Young Adults', 'Adults', 'Seniors'],
                    defaultValue: null, //['Adults']
                    placeholder: 'Pick a target group',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'You must select a target group!'
                }],
                createButtons: [{
                    name: 'Create',
                    action: (event, inputs) => CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs }),
                    clearFormAfterAction: true,
                    closeModalAfterAction: true,
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }],
                createModalOptions: {
                    buttonText: 'Create new category'
                }
            };
        },
        componentDidMount: function () {
            CRUDRedux.dispatch({ type: 'INIT', list: this.props.data });
        },
        render: function () {
            var self = this;
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Categories</h2>

                        <div className="row">
                            {CRUDRedux.getState().map(function (item, index) {
                                return (
                                    <div key={'calloutWrapper'+index} className="small-12 medium-6 large-4 columns float-left">
                                        <div key={'callout'+index} className="callout">
                                            <Read key={'read' + index + 'id' + item.id} item={item} options={self.state.readOptions} debug={false} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Create inputs={this.state.formInputs} buttons={this.state.createButtons} modal={this.state.createModalOptions} debug={true} />
                    </div>
                </div>
            );
        }
    });

    return CRUD;
});