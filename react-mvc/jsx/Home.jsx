
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!orbit/Orbit',
    'jsx!counter/CounterRedux',
    'jsx!counter/Counter',
    'jsx!categories/CategoriesRedux',
    'jsx!categories/Categories',
    'jsx!CRUD/AddRedux'
],
function (React, ReactDOM, ReactRedux, Redux, Orbit, CounterRedux, Counter, CategoriesRedux, Categories, AddRedux) {

    //Mock categories instead of getting from store
    var mockList = [{ id: 0, name: 'Cars' }];
    CategoriesRedux.dispatch({ type: 'INIT', list: mockList });

    var HomeContainer = React.createClass({
        render: function () {
            return (
                <div>
                    <Categories categories={CategoriesRedux.getState()}/>
                </div>
            );
        }
    });

    const render = () => {
        console.log('render called');
        ReactDOM.render(
                    <HomeContainer />,
                    document.getElementById('content')
                );
    }

    //<Counter value={CounterRedux.getState()}
    //onIncrement={() =>CounterRedux.dispatch({ type: 'INCREMENT' })}
    //onDecrement={() =>CounterRedux.dispatch({ type: 'DECREMENT' })} />
    //CounterRedux.subscribe(render);

    CategoriesRedux.subscribe(render);
    AddRedux.subscribe(render);
    render();
});