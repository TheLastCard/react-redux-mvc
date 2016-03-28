
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!CRUD/CRUD',
    'jsx!CRUD/CRUDRedux',
    'jsx!CRUD/CRUDFormRedux',
    'CRUD/ReadOptions',
    'CRUD/InputOptions',
    'CRUD/CRUDActions'
],
function (React, ReactDOM, ReactRedux, Redux, CRUD, CRUDRedux, CRUDFormRedux, ReadOptions, InputOptions, CRUDActions) {

    const urls = {
        readUrl: 'TargetGroups/Read',
        createUrl: 'TargetGroups/Create',
        updateUrl: 'TargetGroups/Update',
        deleteUrl: 'TargetGroups/Delete'
    };
    var actions = CRUDActions(urls);

    const CRUDOptions = {
        debug: true,
        data: actions.READ,
        readOptions: {
            showAsTable: true,
            variables: [
                {
                    variableName: 'name',
                    style: ReadOptions.Tablecell
                },
                {
                    variableName: 'minAge',
                    style: ReadOptions.Tablecell
                },
                {
                    variableName: 'maxAge',
                    style: ReadOptions.Tablecell
                }
            ]
        },
        formInputs: [
            {
                label: 'Name',
                name: 'name',
                type: InputOptions.Text,
                placeholder: 'type a name for the target group',
                wrapperClassName: 'small-12 columns',
                required: true,
                errorMessage: 'Name is missing or to short!',
                regex: '[a-zA-Z]{4}'
            },
            {
                label: 'From Age',
                name: 'minAge',
                type: InputOptions.Range,
                stepValue: 1,
                wrapperClassName: 'small-12 columns',
                required: true,
                errorMessage: 'Age is not defined!'
            },
            {
                label: 'To Age',
                name: 'maxAge',
                type: InputOptions.Range,
                stepValue: 1,
                wrapperClassName: 'small-12 columns',
                required: true,
                errorMessage: 'Age is not defined!'
            }
        ],
        createButtons: [{
            name: 'Create',
            action: actions.CREATE,
            closeModalAfterAction: true,
            className: 'success button',
            wrapperClassName: 'small-12 columns'
        }],
        createModalOptions: {
            openModalButtonText: 'Create new target group',
            openModalButtonClass: 'button success'
        },
        updateButtons: [{
            name: 'Update',
            action: actions.UPDATE,
            closeModalAfterAction: true,
            className: 'success button',
            wrapperClassName: 'small-12 columns'
        }],
        updateModalOptions: {
            openModalButtonText: null,
            openModalButtonClass: 'CRUDUpdateButton'
        },
        deleteButtons: [
            {
                name: 'Cancel',
                closeModalAfterAction: true,
                className: 'button secondary float-right',
                wrapperClassName: 'small-6 columns'
            },
            {
                name: 'Delete',
                action: actions.DELETE,
                closeModalAfterAction: true,
                className: 'button warning  float-left',
                wrapperClassName: 'small-6 columns'
            }
        ],
        deleteModalOptions: {
            modalHeading: 'Delete target group?',
            modalHeadingClass: 'centered',
            openModalButtonText: null,
            openModalButtonClass: 'CRUDDeleteButton'
        }
    };
    var Crud = CRUD(CRUDOptions);

    var TargetGroups = React.createClass({
        renderItems: function () {
            return CRUDRedux.getState().map(function (item, index) {
                if (!item) {
                    return null;
                }
                return (
                    <tbody key={'read-tbody-tg'+index+'itemId'+item.id }>
                        {Crud.READ(item)}
                        <tr className="shrinkRow">
                            <td colSpan="3">
                                {Crud.UPDATE(item)}
                                {Crud.DELETE(item)}
                            </td>
                        </tr>
                    </tbody>
                );
            });
        },
        render: function () {
            var self = this;
            self.renderItems();
            return (
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Target Groups</h2>
                        <div className={'CRUDUpdateTable'}>
                            <table key={'read-table-2'}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age From</th>
                                        <th>Age To</th>
                                    </tr>
                                </thead>
                                {self.renderItems()}
                            </table>
                        </div>
                        {Crud.CREATE()}
                    </div>
                </div>
            );
        }
    });

    const render = () => {
        ReactDOM.render(
            <TargetGroups />,
            document.getElementById('content')
        );
    }

    var unsubscribeCRUDFormRedux = CRUDFormRedux.subscribe(render);
    var unsubscribeCRUDRedux = CRUDRedux.subscribe(render);

    unmountComponent = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        unsubscribeCRUDFormRedux();
        unsubscribeCRUDRedux();
    }

    render();
});