

define([
    'react',
    'jsx!CRUD/Read',
    'jsx!CRUD/Create',
    'jsx!CRUD/CRUDRedux',
    'CRUD/ReadOptions',
    'CRUD/InputOptions'
],
function (React, Read, Create, CRUDRedux, ReadOptions, InputOptions) {

    var CRUD = React.createClass({
        getInitialState: function () {
            return {
                readOptions: {
                    isTable: true,
                    modal: false,
                    variables : [
                        {
                            variableName: 'name',
                            style: ReadOptions.Tablecell
                        },
                        {
                            variableName: 'description',
                            style: ReadOptions.Tablecell
                        },
                        {
                            variableName: 'targetGroup',
                            style: ReadOptions.Tablecell,
                            format: (value) => { return value.toString().replace(',', ', '); }
                        }
                    ]
                },
                formInputs: [{
                    label: 'Name',
                    name: 'name',
                    type: InputOptions.Type.Text,
                    placeholder: 'type a category name',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Name is missing or to short!',
                    regex: '[a-zA-Z]{4}'
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: InputOptions.Type.TextArea,
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Description is missing!'
                },
                {
                    label: 'Target Group',
                    name: 'targetGroup',
                    type: InputOptions.Type.Checkbox,
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

                        <table key={'categoryTable'}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Target group</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CRUDRedux.getState().map(function (item, index) {
                                    return (
                                        <Read key={'read' + index + 'id' + item.id} item={item} options={self.state.readOptions} debug={true} />
                                    );
                                })}
                            </tbody>
                        </table>

                        <Create inputs={this.state.formInputs} buttons={this.state.createButtons} modal={this.state.createModalOptions} debug={true} />
                    </div>
                </div>
            );
        }
    });

    return CRUD;
});