AuthenticatedNavigation = React.createClass({
    mixins: [ ReactMeteorData ],
    getInitialState: function() {
        return {
            /*langs: {
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
            }*/
        };
    },
    getMeteorData() {// todo: to put of getMeteorData (cf what does it wrap)

        let userEmail = Meteor.user().emails[0].address;
        let lang = FlowRouter.current().params.lang; //to have the good menu name we get the param from the URL (good?)

        return {
            items: {
                left: [
                    //{ uid: 'items', href: '/items', label: 'Items' },
                    { uid: 'account', href: '/account/' + lang, label: 'Account' },
                    { uid: 'new-item', href: '/items/' + lang + '/new', label: 'New item' }
                ],
                right: [
                    {
                        uid: lang,
                        href: '#',
                        label: Meteor.settings.public.lang[lang].label,
                        dropdown: true,
                        //DropDownMenu handle items here
                        //todo: OMG learn to use MAP !!!
                        dropdownItems: [
                            { uid: 'fr', href: '#', label: Meteor.settings.public.lang['fr'].label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(Meteor.settings.public.lang[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:'fr'});
                            }},
                            { uid: 'en', href: '#', label: Meteor.settings.public.lang['en'].label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(Meteor.settings.public.lang[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:'en'});
                            }},
                            { uid: 'sk', href: '#', label: Meteor.settings.public.lang['sk'].label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(Meteor.settings.public.lang[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:'sk'});
                            }},
                            { uid: 'ro', href: '#', label: Meteor.settings.public.lang['ro'].label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(Meteor.settings.public.lang[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:'ro'});
                            }},
                            { uid: 'ru', href: '#', label: Meteor.settings.public.lang['ru'].label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(Meteor.settings.public.lang[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:'ru'});
                            }}
                        ]
                    },
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