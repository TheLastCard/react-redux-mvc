


define(['redux', 'expect'], function (Redux, expect) {
    function counter(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            default:
                return 0
        }
    }

    expect(
        counter(0, { type: 'INCREMENT' })
    ).toEqual(1);

    expect(
        counter(1, { type: 'INCREMENT' })
    ).toEqual(2);

    expect(
        counter(2, { type: 'DECREMENT' })
    ).toEqual(1);

    // Create a Redux store holding the state of your app.
    // Its API is { subscribe, dispatch, getState }.
    return Redux.createStore(counter);
});