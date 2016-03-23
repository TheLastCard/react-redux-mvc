
//1#: You must define an item at the Read component: <Read item={<inset item here>}/>
//2#: Define options and add it to the Read component: <Read options={<insert here>}/>
//Example options under:
//var options = {
//    isTable: true,
//    modal: false,
//    variables: [
//        {
//            variableName: 'name',
//            style: ReadOptions.Tablecell
//        },
//        {
//            variableName: 'description',
//            style: ReadOptions.Tablecell
//        },
//        {
//            variableName: 'targetGroup',
//            style: ReadOptions.Tablecell,
//            format: (value) => { return value.toString().replace(',', ', '); }
//        }
//    ]
//}
//3#: If you want debug to be activated you need to specify this on the Read component: <Read debug={true] />

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
            if (!this.props.options.variables) {
                console.error("options.variables is not defined on the Read component! : <Read options={missing options.variables[] here}>");
                return null;
            }
            
            return {
                options: this.props.options,
                hasTableCells: false,
                hasTableRows: false
            }
        },
        createContent: function () {
            var self = this;
            var elements = [];
            this.state.options.variables.map(function (option) {
                if (self.props.debug) {
                    if (!self.runOptionChecks(option)) {
                        return null;
                    }
                }
                var value = option.format ? option.format(self.props.item[option.variableName]) : self.props.item[option.variableName];
                elements.push(self.createElement(option, value));
            });
            return elements;
        },
        createElement: function (option, value) {
            switch (option.style) {
                case ReadOptions.Heading1:
                    return (<h1 key={option.variableName + 'h1'} className={option.class }>{option.label} {value}</h1>);
                    break;
                case ReadOptions.Heading2:
                    return (<h2 key={option.variableName + 'h2'} className={option.class }>{option.label} {value}</h2>);
                    break;
                case ReadOptions.Heading3:
                    return (<h3 key={option.variableName + 'h3'} className={option.class }>{option.label} {value}</h3>);
                    break;
                case ReadOptions.Heading4:
                    return (<h4 key={option.variableName + 'h4'} className={option.class }>{option.label} {value}</h4>);
                    break;
                case ReadOptions.TabelRow:
                    this.state.hasTableRows = true;
                    return (<tr key={option.variableName + 'tableRow'} className={option.class }>{option.label} {value}</tr>);
                    break;
                case ReadOptions.Tablecell:
                    this.state.hasTableCells = true;
                    return (<td key={option.variableName + 'tableRow'} className={option.class }>{option.label} {value}</td>);
                    break;
                default:
                    return (<p key={option.variableName + 'p'} className={option.class }>{option.label} {value}</p>);
                    break;
            }
        },
        runOptionChecks: function (option) {
            if (!option.style) {
                console.error('style is not defined on the option. Choose from aviable styles in the ReadOptions.js file.');
                return false;
            }
            if (!option.variableName) {
                console.error('variableName is not defined! You need to include that in options for the read component <Read options={myOptions} />: myOptions = {variables:[{variableName: \'someVariableName\'}]}');
                return false;
            }
            if (!this.props.item[option.variableName]) {
                console.error('variableName, ' + option.variableName + ' cannot be found in the dataset you have supplied to the read element!');
                return false;
            }
            return true;
        },
        returnDefaultLayout: function (returnStructure) {
            return (<div className={this.props.className}>{returnStructure}</div>);
        },
        returnTableCells: function (returnStructure) {
            return (<tr className={this.props.className}>{returnStructure}</tr>);
        },
        returnTableRows: function (returnStructure) {
            return (<tbody className={this.props.className}>{returnStructure}</tbody>);
        },
        render: function () {
            var self = this;
            var returnStructure = self.createContent();

            if (!this.state.options.isTable) {
                return self.returnDefaultLayout(returnStructure);
            }

            if (this.state.hasTableCells && this.state.hasTableRows) {
                console.error('You cant mix table rows and table cells! Define all your variables as either');
                return null;
            }

            if (this.state.hasTableCells) {
                return self.returnTableCells(returnStructure);
            }
            return self.returnTableRows(returnStructure);
        }
    });

    return Read;
});