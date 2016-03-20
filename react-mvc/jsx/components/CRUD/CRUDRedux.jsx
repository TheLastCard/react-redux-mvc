


define(['redux', 'expect'], function (Redux, expect) {

    const item = (state, action) => {
        switch (action.type) {
            case 'CREATE':
                var result = { id: action.index };
                action.inputs.map(function (input) {
                    result[input.jsonName] = input.value;
                });
                return result;
            case 'UPDATE':
                if (state.id !== action.id) {
                    return state;
                }
                var copy = Object.assign({}, state);
                copy.name = action.name;
                return copy;
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
                var actionCopy = Object.assign({}, action);
                actionCopy.index = state.length;
                return state.concat(item(undefined, actionCopy));
            case 'UPDATE':
                console.log('UPDATE CRUDRedux', action);
                return state.map(c => item(c, action));
            default:
                return [];
        }
    };


    const testInitCrud = () => {
        const listBefore = [];
        const action = {
            type: 'INIT',
            list: [{
                id: 0,
                name: 'Cars'
            }]
        };

        Object.freeze(listBefore);
        Object.freeze(action);

        const listAfter = [
            {
                id: 0,
                name: 'Cars'
            }];

        expect(
            crud(listBefore, action)
        ).toEqual(listAfter);
    }
    testInitCrud();
    console.log('testInitCategory() passed');


    return Redux.createStore(crud);
});