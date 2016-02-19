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
        //console.log('dfvdv ' + e);
        //Session.set('dropdown' + this.props.src, e);
        //Session.set('langTo', e);
        //console.log(this.props.fct);
        console.log('toto');
        $(".dropdown").find('#dLabel' + this.props.src).html(this.props.langList[e].label + ' <span class="caret"></span>');
        return (
            this.props.fct
                );
    },
    renderListItems: function(langList) {
        //list of countries to update + put in conf or DB
        var items = [];
        let component = this; //todo: understand why 'this' alone doesnt work

        Object.getOwnPropertyNames(langList).forEach(function(val, idx, array) {
            items.push(<li key={val}>
                <a href="#" id={val} onClick={component.props.fct/*component.handleClick.bind(component, val)*/}>{langList[val].label}</a></li>);
        });

        return items;
    },
    test: function(){
        console.log('test');
    },
    render: function() {
        //{this.props.list.id[this.props.lang].label}
        //var langList= {FR:{label:"Francais"} , EN:{label:"English"}, SK:{label:"Slovak"},
           // RO:{label:"Romanian"}, RU:{label:"Russian"}};

        //Session.set('dropdown' + this.props.src, this.props.lang);

        return <div className="dropdown">
                    <a id={"dLabel" + this.props.src} className="btn btn-info" data-target="#"
                       data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        {this.props.langList[this.props.lang].label}
                        <span className="caret" ref="caret"></span>
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dLabel">
                        {this.renderListItems(this.props.langList)}
                    </ul>
                </div>;
    }
});
