

define([
    'react',
    'jsx!CRUD/Read',
    'jsx!CRUD/Delete',
    'jsx!CRUD/CRUDForm',
    'jsx!CRUD/CRUDRedux'
],
function (React, Read, Delete, CRUDForm, CRUDRedux) {
    var CRUD = React.createClass({
        getInitialState: function () {
            if (!this.props.options) {
                console.error("options is not defined on the crud element: <CRUD options={undefined} /> !");
            }
            return {
                readOptions: this.props.options.readOptions,
                formInputs: this.props.options.formInputs,
                createButtons: this.props.options.createButtons,
                createModalOptions: this.props.options.createModalOptions,
                updateButtons: this.props.options.updateButtons,
                updateModalOptions: this.props.options.updateModalOptions,
                deleteButtons: this.props.options.deleteButtons,
                deleteModalOptions: this.props.options.deleteModalOptions
            };
        },
        componentDidMount: function () {
            var self = this;
            if (!this.props.options.data) {
                console.error('data is not defined on the options object: options :{data : undefined}')
            }
            if (typeof this.props.options.data !== 'function') {
                CRUDRedux.dispatch({ type: 'INIT', list: this.props.options.data });
            }
            this.props.options.data();
        },
        renderItems: function () {
            var self = this;
            return CRUDRedux.getState().map(function (item, index) {
                if (!item) {
                    return null;
                }
                return (
                    <tbody key={'read-tbody'+index+'itemId'+item.id }>
                        <Read item={item} options={self.state.readOptions} debug={self.props.debug} />
                        <tr className="shrinkRow">
                            <td colSpan="3">
                                <CRUDForm inputs={self.state.formInputs} buttons={self.state.updateButtons} modal={self.state.updateModalOptions} item={item} debug={self.props.debug} />
                                <Delete item={item} buttons={self.state.deleteButtons} modal={self.state.deleteModalOptions} />
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

                        <div className={'CRUDUpdateTable'}>
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
                        </div>

                        <CRUDForm key={'CRUDCreateForm'} inputs={this.state.formInputs} buttons={this.state.createButtons} modal={this.state.createModalOptions} debug={this.props.debug} />
                    </div>
                </div>
            );
        }
    });
    return CRUD;
});