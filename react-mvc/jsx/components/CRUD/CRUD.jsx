

define([
    'react',
    'jsx!CRUD/Read',
    'jsx!CRUD/Delete',
    'jsx!CRUD/CRUDForm',
    'jsx!CRUD/CRUDRedux'
],
function (React, Read, Delete, CRUDForm, CRUDRedux) {

    const CRUD = (options, debug) => {
        if (!options) {
            console.error("options is not supplied to the CRUD constructor. Example on how to initiate: var crud = CRUD(options);");
        }
        function init() {
            console.log('CRUD INIT');
            if (!options.data) {
                console.error('data is not defined on the options object: options :{data : undefined}')
            }
            if (typeof options.data !== 'function') {
                CRUDRedux.dispatch({ type: 'INIT', list: options.data });
            }
            options.data();
        }
        init();

        function pickCRUDElementType(item, type, index) {
            switch (type) {
                case 'READ':
                    return (<Read key={'READ'+item.id} item={item} options={options.readOptions} debug={options.debug} />);
                    break;
                case 'UPDATE':
                    return (<CRUDForm key={'UPDATE'+item.id} inputs={options.formInputs} buttons={options.updateButtons} modal={options.updateModalOptions} item={item} debug={options.debug} />);
                    break;
                case 'DELETE':
                    return (<Delete key={'DELETE'+item.id} item={item} buttons={options.deleteButtons} modal={options.deleteModalOptions} />);
                    break;
            }
        }

        function createCRUDElement(item, type) {
            var state = CRUDRedux.getState();
            if (!item) {
                return state.map(function (item, index) {
                    if (!item) {
                        return null;
                    }
                    return pickCRUDElementType(item, type, index);
                });
            }
            return pickCRUDElementType(item, type, '');
        }

        return {
            CREATE: () => {
                return (
                    <CRUDForm key={'CRUDCreateForm'} inputs={options.formInputs} buttons={options.createButtons} modal={options.createModalOptions} debug={options.debug} />
                );
            },
            READ: (item) => {
                return createCRUDElement(item, 'READ');
            },
            UPDATE: (item) => {
                return createCRUDElement(item, 'UPDATE');
            },
            DELETE: (item) => {
                return createCRUDElement(item, 'DELETE');
            }
        }
    }
    return CRUD;
});