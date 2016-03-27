AppHeader = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let temp = FlowRouter.current().params.lang;
        let lang = temp ? temp : 'en' ;
        return {

            //!! to tranform object in Boolean
            brandLink: '/items/' + lang,//!!Meteor.user() ? '/items/en' : '/items/en', //SPECIFIC: to update regarding DB todo: lang dynamic
            user: Meteor.user()
        };
    },
    render() {
        //console.log(Session.get('lang'));
        return (
            <NavBar id="app-header" brandLink={ this.data.brandLink } brand="Anegdot Translator">
                { this.props.hasUser ? <AuthenticatedNavigation user={ this.data.user } /> : <PublicNavigation /> }
            </NavBar>
        );
    }
});