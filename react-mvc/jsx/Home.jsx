

// Start the main app logic.
requirejs(['react', 'ReactDOM', 'ReactRedux', 'redux', 'expect', 'deepFreeze'],
    function (React, ReactDOM, ReactRedux, redux, expect, deepFreeze) {

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