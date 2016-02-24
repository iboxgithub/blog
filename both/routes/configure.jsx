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
    if ( currentRoute && currentRoute.route.group.name === 'public' ) {
        //FlowRouter.go( 'index' ); //SPECIFIC
        FlowRouter.go( 'items', {lang:'en'} ); //SPECIFIC
    }
});
/*
 ------------------------ END GENERIC
 */