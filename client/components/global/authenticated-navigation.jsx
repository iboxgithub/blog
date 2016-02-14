AuthenticatedNavigation = React.createClass({
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let userEmail = Meteor.user().emails[0].address;
        let langs = {
            fr:{
                id:'fr',label:'Français'
            },
            en:{
                id:'en',label:'English'
            },
            sk:{
                id:'sk',label:'Slovak'
            },
            ro:{
                id:'ro',label:'Romanian'
            },
            ru:{
                id:'ru',label:'Russian'
            }
        }


        let userLang = Session.get('currentLang') ?  Session.get('currentLang') : langs.fr;//todo: to load with user specific Meteor.user().emails[0].address;
        Session.set('currentLang',userLang);

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
                            }}
                        ]
                    },
                    {
                        uid: userLang.id,
                        href: '#',
                        label: userLang.label,
                        dropdown: true,
                        //DropDownMenu handle items here
                        dropdownItems: [
                            { uid: langs.fr.id, href: '#', label: langs.fr.label, action: () => {
                                Session.set('currentLang',langs.fr);
                                FlowRouter.go( 'items',{lang:langs.fr.id});
                            }},
                            { uid: langs.en.id, href: '#', label: langs.en.label, action: () => {
                                Session.set('currentLang',langs.en);
                                FlowRouter.go( 'items',{lang:langs.en.id});
                            }},
                            { uid: langs.sk.id, href: '#', label: langs.sk.label, action: () => {
                                Session.set('currentLang',langs.sk);
                                FlowRouter.go( 'items',{lang:langs.sk.id});
                            }},
                            { uid: langs.ro.id, href: '#', label: langs.ro.label, action: () => {
                                Session.set('currentLang',langs.ro);
                                FlowRouter.go( 'items',{lang:langs.ro.id});
                            }},
                            { uid: langs.ru.id, href: '#', label: langs.ru.label, action: () => {
                                Session.set('currentLang',langs.ru);
                                FlowRouter.go( 'items',{lang:langs.ru.id});
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