AppHeader = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        return {
            //!! to tranform object in Boolean
            brandLink: !!Meteor.user() ? '/items/fr' : '/items/en', //SPECIFIC: to update regarding DB todo: lang dynamic
            user: Meteor.user()
        };
    },
    render() {
        return (
            <NavBar id="app-header" brandLink={ this.data.brandLink } brand="Anegdot Translator">
                { this.props.hasUser ? <AuthenticatedNavigation user={ this.data.user } /> : <PublicNavigation /> }
            </NavBar>
        );
    }
});