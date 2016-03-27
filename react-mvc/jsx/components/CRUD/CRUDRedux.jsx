


define(['redux', 'expect'], function (Redux, expect) {
    const single = (state, action) => {
        switch (action.type) {
            case 'CREATE':
                var result = { id: action.id };
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
                var result = { id: action.id };
                action.inputs.map(function (input) {
                    if (!input.jsonName) {
                        result[input.name] = input.value;
                    }
                    else {
                        result[input.jsonName] = input.value;
                    }
                });
                return result;
            default:
                return state;
        }
    };

    const crud = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CRUDRedux');
                if (!Array.isArray(action.list)) {
                    console.error('The data you have supplied to the CRUDRedux componenet does not seem to be an array of objects! Action.list = ' + action.list + '. Returning empty array instead');
                    return [];
                }
                return action.list.slice();
            case 'CREATE':
                console.log('CREATE CRUDRedux');
                var stateCopy = state.slice();
                var actionCopy = Object.assign({}, action);
                actionCopy.id = state.length;
                return stateCopy.concat(single(undefined, actionCopy));
            case 'UPDATE':
                console.log('UPDATE CRUDRedux');
                var stateCopy = state.slice();
                var actionCopy = Object.assign({}, action);
                
                return stateCopy.map(function (item) {
                    if (!item) {
                        return null;
                    }
                    if (item.id !== actionCopy.id) {
                        return item;
                    }
                    return single(undefined, actionCopy);
                });
            case 'DELETE':
                console.log('DELETE CRUDRedux');
                if (state.length === 1) {
                    return [];
                }
                return state.map(function (item) {
                    if (!item) {
                        return null;
                    }
                    if (item.id !== action.id) {
                        return item;
                    }
                });
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