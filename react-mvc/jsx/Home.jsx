
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!CRUD/CRUD',
    'jsx!CRUD/CRUDRedux',
    'jsx!CRUD/CRUDFormRedux'
],
function (React, ReactDOM, ReactRedux, Redux, CRUD, CRUDRedux, CRUDFormRedux) {

    //Mock categories instead of getting from store
    var mockList = [
        {
            id: 0,
            name: 'Cars',
            description: 'Stuff that you drive around with',
            targetGroup: ['Young Adults', 'Adults']
        }];


    const render = () => {
        ReactDOM.render(
                    <CRUD data={mockList}/>,
                    document.getElementById('content')
                );
    }

    CRUDFormRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});