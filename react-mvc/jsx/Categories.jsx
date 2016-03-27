﻿
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
        readUrl: 'Categories/GetCategories',
        createUrl: 'Categories/CreateCategory',
        updateUrl: 'Categories/UpdateCategory',
        deleteUrl: 'Categories/DeleteCategory'
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
            alternatives: [
                {
                    name: 'Children',
                    value: 'Children'
                },
                {
                    name: 'Young Adults',
                    value: 'Young Adults'
                },
                {
                    name: 'Adults',
                    value: 'Adults'
                },
                {
                    name: 'Seniors',
                    value: 'Seniors'
                }
            ],
            defaultValue: ['Adults'],
            placeholder: 'Pick a target group',
            wrapperClassName: 'small-12 columns',
            required: true,
            errorMessage: 'You must select a target group!'
        }],
        createButtons: [{
            name: 'Create',
            action: actions.CREATE,
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
            modalHeading: 'Delete item?',
            modalHeadingClass: 'centered',
            openModalButtonText: null,
            openModalButtonClass: 'CRUDDeleteButton'
        }
    };
    var Crud = CRUD(CRUDOptions);

    var Categories = React.createClass({
        renderItems: function () {
            return CRUDRedux.getState().map(function (item, index) {
                if (!item) {
                    return null;
                }
                return (
                    <tbody key={'read-tbody'+index+'itemId'+item.id }>
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
                        {Crud.CREATE()}
                    </div>
                </div>
            );
        }
    });

    const render = () => {
        ReactDOM.render(
            <Categories />,
            document.getElementById('categoriesCRUD')
        );
    }

    CRUDFormRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});