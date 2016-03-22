
requirejs([
    'react',
    'reactDOM',
    'reactRedux',
    'redux',
    'jsx!CRUD/CRUD',
    'jsx!CRUD/CreateRedux',
    'jsx!CRUD/CRUDRedux'
],
function (React, ReactDOM, ReactRedux, Redux, CRUD, CreateRedux, CRUDRedux) {

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
                    <CRUD data={mockList}/>,
                    document.getElementById('content')
                );
    }

    CreateRedux.subscribe(render);
    CRUDRedux.subscribe(render);

    render();
});