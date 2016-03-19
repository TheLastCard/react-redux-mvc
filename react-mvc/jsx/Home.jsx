
requirejs([
    'react',
    'ReactDOM',
    'ReactRedux',
    'redux',
    'jsx!/jsx/components/orbit/Orbit',
    'jsx!/jsx/components/counter/CounterRedux',
    'jsx!/jsx/components/counter/Counter'
],
function (React, ReactDOM, ReactRedux, Redux, Orbit, CounterRedux, Counter) {

    var HomeContainer = React.createClass({
        render: function () {
            return (
                    <div>
                        <Orbit />,
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
    CounterRedux.subscribe(render);
    render();
});