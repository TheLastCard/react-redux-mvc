
define(['redux', 'expect'], function (Redux, expect) {

    const add = (state, action) => {
        switch (action.type) {
            case 'INIT':
                console.log('INIT AddRedux');
                return action.list.slice();
            case 'CHANGE':
                console.log('CHANGE AddRedux');
                var inputsCopy = state.slice();
                inputsCopy[action.index].value = action.event.target.value;
                return inputsCopy;
            case 'CLEAR':
                console.log('CLEAR AddRedux');
                var inputsCopy = state.slice();
                inputsCopy[action.index].value = null;
                return inputsCopy;
            default:
                return [];
        }
    };
    return Redux.createStore(add);
});