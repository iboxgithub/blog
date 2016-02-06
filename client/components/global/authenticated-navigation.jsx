AuthenticatedNavigation = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let userEmail = Meteor.user().emails[0].address;

        return {
            items: {
                left: [
                    //{ uid: 'items', href: '/items', label: 'Items' },
                    { uid: 'account', href: '/account', label: 'Account' }
                ],
                right: [
                    {
                        uid: 'currentUser',
                        href: '#',
                        label: userEmail,
                        dropdown: true,
                        //DropDownMenu handle items here
                        dropdownItems: [
                            { uid: 'logout', href: '#', label: 'Logout', action: () => {
                                return Meteor.logout( () => {
                                    FlowRouter.go( 'index' );
                                });
                            }},
                            { uid: 'logout2', href: '#', label: 'Logout2', action: () => {
                                return Meteor.logout( () => {
                                    FlowRouter.go( 'index' );
                                });
                            }}
                        ]
                    }
                ]
            }
        };
    },
    render() {
        return <div className="authenticated-navigation">
            <NavBarNav position={ `navbar-left` } items={ this.data.items.left } />
            <NavBarNav position={ `navbar-right` } items={ this.data.items.right } />
        </div>;
    }
});