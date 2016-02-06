App = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        return {
            loggingIn: Meteor.loggingIn(),
            hasUser: !!Meteor.user(),
            isPublic( route ) { //return true if the route name is in this array, BOF c'est ecrit en dur...
                return [
                        'index',
                        'items',
                        'tagIndex',
                        'login',
                        'signup',
                        'recoverPassword',
                        'resetPassword',
                        'notFound'
                    ].indexOf( route ) > -1;
            },
            canView() {
                //- is this ROUTE public?
                //- "!!" = tranfor;ing Meteor.user() to boolean (if exists = true)
                // if one or the other return true we CAN view the page (so if we are in a public page or logged in on a private page)
                return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
            }
        };
    },
    getView() {
        ///- yield displays the current route
        //- rendering directly Loging (and not calling the route) allows to keep the same URL
        // >> (so to arrive on it directly when logged in --> dedicated browsing instead of "One path for all")
        return this.data.canView() ? this.props.yield : <Login />;
    },
    render() {
        return (
            <div className="app-root">
                <AppHeader hasUser={ this.data.hasUser } />
                <div className="container">
                    { this.data.loggingIn ? <Loading /> : this.getView() }
                </div>
            </div>
        );
    }
});