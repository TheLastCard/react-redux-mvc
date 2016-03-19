

define(['react'], function (React) {
    var Counter = React.createClass({
        render: function () {
            return (
                <div>
                    <h1>{this.props.value}</h1>
                    <button onClick={this.props.onIncrement}>+</button>
                    <button onClick={this.props.onDecrement}>-</button>
                </div>
            );
        }
    });

    return Counter;
});