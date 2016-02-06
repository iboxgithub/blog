

Account = React.createClass({
    /*mixins: [ ReactMeteorData ],
    getMeteorData() {

    },
    componentDidMount() {
        //Modules.client.anegdot( { form: "#anegdot" } );
    },*/
    render() {
        let userEmail = Meteor.user().emails[0].address;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    {userEmail}
                </div>
                <div className="panel-body">
                    My data
                </div>
            </div>
        );
    }
});