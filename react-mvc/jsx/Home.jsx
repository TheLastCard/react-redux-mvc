
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!orbit/Orbit',
    'jsx!counter/CounterRedux',
    'jsx!counter/Counter',
    'jsx!categories/CategoriesRedux',
],
function (React, ReactDOM, ReactRedux, Redux, Orbit, CounterRedux, Counter, CategoriesRedux) {

    var HomeContainer = React.createClass({
        render: function () {
            return (
                    <div>
                        <Counter value={CounterRedux.getState()}
                                 onIncrement={() =>CounterRedux.dispatch({ type: 'INCREMENT' })}
                                 onDecrement={() =>CounterRedux.dispatch({ type: 'DECREMENT' })} />
                    </div>
                );
        }
    });

    const render = () => {
        ReactDOM.render(
                    <HomeContainer />,
                    document.getElementById('content')
                );
    }

    console.log(CategoriesRedux.getState());
    CategoriesRedux.dispatch({ type: 'ADD_CATEGORY', name: 'Test' });
    console.log(CategoriesRedux.getState());

    CounterRedux.subscribe(render);
    render();
});