
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!orbit/Orbit',
    'jsx!counter/CounterRedux',
    'jsx!counter/Counter',
    'jsx!categories/Categories',
    'jsx!CRUD/CreateRedux',
    'jsx!CRUD/CRUDRedux'
],
function (React, ReactDOM, ReactRedux, Redux, Orbit, CounterRedux, Counter, Categories, CreateRedux, CRUDRedux) {

    //Mock categories instead of getting from store
    var mockList = [
        {
            id: 0,
            name: 'Cars',
            description: 'Stuff that you drive around with',
            audienceGroup: ['Young Adults', 'Adults']
        }];

    var HomeContainer = React.createClass({
        render: function () {
            return (
                <div>
                    <Categories categories={mockList}/>
                </div>
            );
        }
    });

    const render = () => {
        //console.log('render called');
        ReactDOM.render(
                    <HomeContainer />,
                    document.getElementById('content')
                );
    }

    //<Counter value={CounterRedux.getState()}
    //onIncrement={() =>CounterRedux.dispatch({ type: 'INCREMENT' })}
    //onDecrement={() =>CounterRedux.dispatch({ type: 'DECREMENT' })} />
    //CounterRedux.subscribe(render);

    CreateRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});