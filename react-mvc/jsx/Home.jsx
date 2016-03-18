

requirejs(['react', 'ReactDOM', 'ReactRedux', 'jsx!/jsx/components/orbit/Orbit', 'jsx!/jsx/components/counter/Counter'],
    function (React, ReactDOM, ReactRedux, Orbit, Counter) {


        var HomeContainer = React.createClass({
            render: function () {
                return (
                    <Orbit />
                );
            }
        });

        ReactDOM.render(
            <HomeContainer />,
            document.getElementById('content')
        );
    });