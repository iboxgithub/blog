AuthenticatedNavigation = React.createClass({
    mixins: [ ReactMeteorData ],
    getInitialState: function() {
        return {
            langs: {
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
        };
    },
    getMeteorData() {
        let userEmail = Meteor.user().emails[0].address;
        //because on the first launch, there will be no Session value, so it will be empty few milliseconds
        let lang = 'en';
        if(Session.get('lang'))
            lang = Session.get('lang');


        let userLang = Session.get('currentLang') ?  Session.get('currentLang') : this.state.langs.fr;//todo: to load with user specific Meteor.user().emails[0].address;
        Session.set('currentLang',userLang);

        return {
            items: {
                left: [
                    //{ uid: 'items', href: '/items', label: 'Items' },
                    { uid: 'account', href: '/account', label: 'Account' }
                ],
                right: [
                    {
                        uid: 'langsNavBar',
                        href: '#',
                        label: /*userLang.label Session.get('lang')*/this.state.langs[lang].label,
                        dropdown: true,
                        //DropDownMenu handle items here
                        //todo: OMG learn to use MAP !!!
                        dropdownItems: [
                            { uid: this.state.langs.fr.id, href: '#', label: this.state.langs.fr.label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(this.state.langs[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:this.state.langs.fr.id});
                            }},
                            { uid: this.state.langs.en.id, href: '#', label: this.state.langs.en.label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(this.state.langs[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:this.state.langs.en.id});
                            }},
                            { uid: this.state.langs.sk.id, href: '#', label: this.state.langs.sk.label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(this.state.langs[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:this.state.langs.sk.id});
                            }},
                            { uid: this.state.langs.ro.id, href: '#', label: this.state.langs.ro.label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(this.state.langs[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:this.state.langs.ro.id});
                            }},
                            { uid: this.state.langs.ru.id, href: '#', label: this.state.langs.ru.label, action: (e) => {
                                $("li.langsNavBar").find('#langsNavBar').html(this.state.langs[e].label + ' <span class="caret"></span>');
                                FlowRouter.go( 'items',{lang:this.state.langs.ru.id});
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