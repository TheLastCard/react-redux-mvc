


define(['redux', 'expect'], function (Redux, expect) {

    const item = (state, action) => {
        switch (action.type) {
            case 'CREATE':
                var result = { id: action.index };
                action.inputs.map(function (input) {
                    if (!input.jsonName) {
                        result[input.name] = input.value;
                    }
                    else {
                        result[input.jsonName] = input.value;
                    }
                });
                return result;
            case 'UPDATE':
                console.log('UPDATE -> item');
                return state.map(function (item) {
                    if (item.id !== action.id) {
                        return item;
                    }
                });
            default:
                return state;
        }
    };

    const crud = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CRUDRedux');
                return action.list.slice();
            case 'CREATE':
                console.log('CREATE CRUDRedux');
                var stateCopy = state.slice();
                var actionCopy = Object.assign({}, action);
                actionCopy.index = state.length;
                return stateCopy.concat(item(undefined, actionCopy));
            case 'UPDATE':
                console.warn('UPDATE CRUDRedux -> ');
                var stateCopy = state.slice();
                var actionCopy = Object.assign({}, action);
                return stateCopy.concat(item(stateCopy, actionCopy));
            default:
                return [];
        }
    };


    //const testInitCrud = () => {
    //    const listBefore = [];
    //    const action = {
    //        type: 'INIT',
    //        list: [{
    //            id: 0,
    //            name: 'Cars'
    //        }]
    //    };

    //    Object.freeze(listBefore);
    //    Object.freeze(action);

    //    const listAfter = [
    //        {
    //            id: 0,
    //            name: 'Cars'
    //        }];

    //    expect(
    //        crud(listBefore, action)
    //    ).toEqual(listAfter);
    //}
    //testInitCrud();
    //console.log('testInitCategory() passed');


    return Redux.createStore(crud);
});