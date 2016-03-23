

define([
    'react',
    'jsx!CRUD/Read',
    'jsx!CRUD/CRUDForm',
    'jsx!CRUD/CRUDRedux',
    'CRUD/ReadOptions',
    'CRUD/InputOptions'
],
function (React, Read, CRUDForm, CRUDRedux, ReadOptions, InputOptions) {
    var CRUD = React.createClass({
        getInitialState: function () {
            return {
                readOptions: {
                    isTable: true,
                    modal: false,
                    wrapperClass:null,
                    variables: [
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
                    type: InputOptions.Text,
                    placeholder: 'type a category name',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Name is missing or to short!',
                    regex: '[a-zA-Z]{4}'
                },
                {
                    label: 'Description',
                    name: 'description',
                    type: InputOptions.TextArea,
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'Description is missing!'
                },
                {
                    label: 'Target Group',
                    name: 'targetGroup',
                    type: InputOptions.Checkbox,
                    alternatives: ['Children', 'Young Adults', 'Adults', 'Seniors'],
                    defaultValue: null, //['Adults']
                    placeholder: 'Pick a target group',
                    wrapperClassName: 'small-12 columns',
                    required: true,
                    errorMessage: 'You must select a target group!'
                }],
                createButtons: [{
                    name: 'Create',
                    action: (event, inputs, id) => CRUDRedux.dispatch({ type: 'CREATE', event: event, inputs: inputs, id: id }),
                    closeModalAfterAction: true,
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }],
                createModalOptions: {
                    openModalButtonText: 'Create new category',
                    openModalButtonClass: 'button success'
                },
                updateButtons: [{
                    name: 'Update',
                    action: (event, inputs, id) => CRUDRedux.dispatch({ type: 'UPDATE', event: event, inputs: inputs, id: id }),
                    closeModalAfterAction: true,
                    className: 'success button',
                    wrapperClassName: 'small-12 columns'
                }],
                updateModalOptions: {
                    openModalButtonText: 'Edit category',
                    openModalButtonClass: 'button'
                },
            };
        },
        componentDidMount: function () {
            CRUDRedux.dispatch({ type: 'INIT', list: this.props.data });
        },
        renderItems: function () {
            var self = this;
            return CRUDRedux.getState().map(function (item, index) {
                return (
                    <tbody key={'read-tbody'+index+'itemId'+item.id }>
                        <Read item={item} options={self.state.readOptions} debug={true} />
                        <tr className="shrinkRow">
                            <td colSpan="3">
                                <CRUDForm inputs={self.state.formInputs} buttons={self.state.updateButtons} modal={self.state.updateModalOptions} item={item} debug={true} />                                
                            </td>
                        </tr>
                    </tbody>
                );
            });
        },
        render: function () {
            var self = this;
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Categories</h2>

                        <table key={'read-table'}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Target group</th>
                                </tr>
                            </thead>
                            {self.renderItems()}
                        </table>

                        <CRUDForm key={'CRUDCreateForm'} inputs={this.state.formInputs} buttons={this.state.createButtons} modal={this.state.createModalOptions} debug={true} />
                    </div>
                </div>
            );
        }
    });
    return CRUD;
});