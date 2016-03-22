

define(['react', 'CRUD/ReadOptions'], function (React, ReadOptions) {
    var Read = React.createClass({
        getInitialState: function () {
            if (!this.props.item) {
                console.error("item is not defined on the Read component! : <Read item={undefined}>");
                return null;
            }
            if (!this.props.options) {
                console.error("options is not defined on the Read component! : <Read options={undefined}>");
                return null;
            }

            return {
                item: this.props.item,
                options: this.props.options
            }
        },
        createContent: function () {
            var self = this;
            var elements = [];
            this.state.options.map(function (option) {
                if (self.props.debug) {
                    if (!self.runOptionChecks(option)) {
                        return null;
                    }
                }
                var value = option.format ? option.format(self.state.item[option.variableName]) : self.state.item[option.variableName];

                elements.push(self.createElement(option, value));
            });
            return elements;
        },
        createElement: function (option, value) {
            switch (option.style) {
                case ReadOptions.Heading1:
                    return <h1 key={option.variableName+'h1'} className={option.class}>{option.label} {value}</h1>
                    break;
                case ReadOptions.Heading2:
                    return <h2 key={option.variableName + 'h2'} className={option.class }>{option.label} {value}</h2>
                    break;
                case ReadOptions.Heading3:
                    return <h3 key={option.variableName + 'h3'} className={option.class }>{option.label} {value}</h3>
                    break;
                case ReadOptions.Heading4:
                    return <h4 key={option.variableName + 'h4'} className={option.class }>{option.label} {value}</h4>
                    break;
                default:
                    return <p key={option.variableName + 'p'} className={option.class }>{option.label} {value}</p>
                    break;
            }
        },
        runOptionChecks: function (option) {
            if (!option.style) {
                console.error('style is not defined on the option. Choose from aviable styles in the ReadOptions.js file.');
                return false;
            }
            if (!option.variableName) {
                console.error('variableName is not defined! You need to include that in options for the read component <Read options={myOptions} />: myOptions = [{variableName: \'someVariableName\'}]');
                return false;
            }
            if (!this.state.item[option.variableName]) {
                console.error('variableName, ' + option.variableName + ' cannot be found in the dataset you have supplied to the read element!');
                return false;
            }
            return true;
        },
        render: function () {
            var self = this;
            return (
                <div>
                    {self.createContent()}
                </div>
            );
        }
    });

    return Read;
});