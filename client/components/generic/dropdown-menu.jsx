DropdownMenu = React.createClass({
    renderDivider() {
        return <li role="separator" className="divider"></li>;
    },
    renderItem( item, index ) {
        let active = item.active ? 'active' : '';
        let component = this; //todo: understand why 'this' alone doesnt work
        let key = item.uid;//`nav-item-${ item.uid }`;

        return <li key={ key } className={ active } onClick={ item.action.bind(component, key) }>
            <a href={ item.href }>{ item.label }</a>
        </li>;
    },
    render() {
        return <ul className="dropdown-menu">
            {this.props.items.map( ( item, index ) => {
                return item.divider ? this.renderDivider( item, index ) : this.renderItem( item, index );
            })}
        </ul>;
    }
});