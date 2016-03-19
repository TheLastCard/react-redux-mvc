


define(['redux', 'expect'], function (Redux, expect) {

    function categories(state, action) {
        switch (action.type) {
            case 'ADD_CATEGORY':
                return state.concat(action.name);
            case 'RENAME_CATEGORY':
                return list;
            default:
                return [];
        }
    }
    const testAddCategory = () => {
        var listBefore = ['Toys'];
        var listAfter = ['Toys', 'Cars'];
        Object.freeze(listBefore);

        expect(
            categories(listBefore, { type: 'ADD_CATEGORY', name: 'Cars' })
        ).toEqual(listAfter);
    }

    testAddCategory();
    console.log('testAddCategory() passed');

    return Redux.createStore(categories);
});