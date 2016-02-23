Dropdown = React.createClass({
    getDefaultProps: function() {
        return {
            langList: {fr:{label:"Francais"} , en:{label:"English"}, sk:{label:"Slovak"},
                ro:{label:"Romanian"}, ru:{label:"Russian"}}
        };
    },
    propTypes: {
        lang: React.PropTypes.string.isRequired,
        src: React.PropTypes.string.isRequired
    },
    handleClick(e) {

        $(".dropdown").find('#dLabel' + this.props.src).html(this.props.langList[e].label + ' <span class="caret"></span>');
        //console.log('rr ' + e);
        this.props.callback(e);
    },
    renderListItems: function(langList) {
        //list of countries to update + put in conf or DB
        var items = [];
        let component = this; //todo: understand why 'this' alone doesnt work

        Object.getOwnPropertyNames(langList).forEach(function(val, idx, array) {
            items.push(<li key={val}>
                <a href="#" id={val} onClick={/*component.props.callback*/ component.handleClick.bind(component, val)}>{langList[val].label}</a></li>);
        });

        return items;
    },
    render: function() {

        //todo: we put Choose your lang because the data at first render is f***ing annoying to do in our case, to refactor later
        return <div className="dropdown">
                    <a id={"dLabel" + this.props.src} className="btn btn-info" data-target="#"
                       data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Choose your language{/*this.props.langList[this.props.lang].label*/}
                        <span className="caret" ref="caret"></span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dLabel">
                        {this.renderListItems(this.props.langList)}
                    </ul>
                </div>;
    }
});
