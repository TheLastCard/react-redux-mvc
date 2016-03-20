
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
            targetGroup: ['Young Adults', 'Adults']
        }];


    const render = () => {
        //console.log('render called');
        ReactDOM.render(
                    <Categories categories={mockList}/>,
                    document.getElementById('content')
                );
    }

    CreateRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});