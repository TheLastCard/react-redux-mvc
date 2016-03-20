


define(['redux', 'expect'], function (Redux, expect) {

    const category = (state, action) => {
        switch (action.type) {
            case 'ADD_CATEGORY':
                return {
                    id: action.id,
                    name: action.name
                }
            case 'RENAME_CATEGORY':
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

    const categories = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT CATEGORIES');
                return action.list.slice();
            case 'ADD_CATEGORY':
                console.log('ADD_CATEGORY', action);
                return state.concat(category(undefined, action));
            case 'RENAME_CATEGORY':
                console.log('RENAME_CATEGORY', action);
                return state.map(c => category(c, action));
            default:
                return [];
        }
    };


    //const testInitCategory = () => {
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
    //        categories(listBefore, action)
    //    ).toEqual(listAfter);
    //}
    //testInitCategory();
    //console.log('testInitCategory() passed');

    //const testRenameCategory = () => {
    //    const listBefore = [
    //        {
    //            id: 0,
    //            name: 'Toys'
    //        },
    //        {
    //            id: 1,
    //            name: 'Dolls'
    //        }];

    //    const action = {
    //        type: 'RENAME_CATEGORY',
    //        id: 0,
    //        name: 'Cars'
    //    };

    //    Object.freeze(listBefore);
    //    Object.freeze(action);

    //    const listAfter = [
    //        {
    //            id: 0,
    //            name: 'Cars'
    //        },
    //        {
    //            id: 1,
    //            name: 'Dolls'
    //        }];

    //    expect(
    //        categories(listBefore, action)
    //    ).toEqual(listAfter);
    //}
    //testRenameCategory();
    //console.log('testRenameCategory() passed');

    //const testAddCategory = () => {
    //    const listBefore = [
    //        {
    //            id: 0,
    //            name: 'Toys'
    //        }];

    //    const listAfter = [
    //        {
    //            id: 0,
    //            name: 'Toys'
    //        },
    //        {
    //            id: 1,
    //            name: 'Cars'
    //        }];

    //    const action = {
    //        type: 'ADD_CATEGORY',
    //        id: 1,
    //        name: 'Cars'
    //    };

    //    Object.freeze(listBefore);
    //    Object.freeze(action);

    //    expect(
    //        categories(listBefore, action)
    //    ).toEqual(listAfter);
    //}

    //testAddCategory();
    //console.log('testAddCategory() passed');



    return Redux.createStore(categories);
});