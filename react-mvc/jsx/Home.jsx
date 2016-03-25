
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
            alternatives: ['Children', 'Young Adults', 'Adults', 'Seniors'],
            defaultValue: null, //['Adults']
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
    }

    const render = () => {
        ReactDOM.render(
            <CRUD options={CRUDOptions} debug={true}/>,
            document.getElementById('content')
        );
    }

    CRUDFormRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});