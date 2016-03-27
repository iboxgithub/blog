
/*
------------------------ GENERIC
 */
const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route( '/', {
    name: 'index',
    action(params) {
        ReactLayout.render( App, { yield: <ItemsList lang={Meteor.settings.public.lang['main'].id} /> } ); //SPECIFIC (PostsIndex, Index...)
    }
});

publicRoutes.route( '/signup', {
    name: 'signup',
    action(params) {
        ReactLayout.render( App, { yield: <Signup /> } );
    }
});

publicRoutes.route( '/login', {
    name: 'login',
    action(params) {
        ReactLayout.render( App, { yield: <Login /> } );
    }
});

publicRoutes.route( '/recover-password', {
    name: 'recover-password',
    action(params) {
        ReactLayout.render( App, { yield: <RecoverPassword /> } );
    }
});

publicRoutes.route( '/reset-password/:token', {
    name: 'reset-password',
    action(params) {
        ReactLayout.render( App, { yield: <ResetPassword /> } );
    }
});
/*
 ------------------------ END GENERIC
 */


