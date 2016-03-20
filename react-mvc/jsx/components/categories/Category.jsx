

define(['react'], function (React) {
    var Category = React.createClass({
        render: function () {
            return (
                <div>
                    <h4>{this.props.name}</h4>
                    <p>Id: {this.props.id}</p>
                </div>
            );
        }
    });

    return Category;
});