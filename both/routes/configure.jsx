/*
 ------------------------ GENERIC
 */
FlowRouter.notFound = {
    name: 'notFound',
    action() {
        ReactLayout.render( App, { yield: <NotFound /> } );
    }
};

Accounts.onLogin( () => {
    let currentRoute = FlowRouter.current();
    console.log(currentRoute);
    let temp = FlowRouter.getParam('lang');
    //Case 1: on login from the Login page we will route to the main language (because we dont have specific info from URL)
    //Case 2: the browser auto log the user and the target is a URL already containing the lang
    let lang = temp ? temp : Meteor.settings.public.lang['main'].id;

    //todo: cf if useful
    if ( currentRoute && currentRoute.route.group.name === 'public' ) {
        //FlowRouter.go( 'index' ); //SPECIFIC
        FlowRouter.go( 'items', {lang:lang} ); //SPECIFIC
    }
    else{
        FlowRouter.go( 'items', {lang:lang} ); //SPECIFIC
    }
});
/*
 ------------------------ END GENERIC
 */