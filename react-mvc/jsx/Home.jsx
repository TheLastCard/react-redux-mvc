
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
    var mockList = [];


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