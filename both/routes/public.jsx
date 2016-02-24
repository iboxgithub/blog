
/*
------------------------ GENERIC
 */
const publicRoutes = FlowRouter.group({
    name: 'public'
});

publicRoutes.route( '/', {
    name: 'index',
    action() {
        ReactLayout.render( App, { yield: <ItemsList private={false} lang={'en'} /> } ); //SPECIFIC (PostsIndex, Index...)
    }
});

publicRoutes.route( '/signup', {
    name: 'signup',
    action() {
        ReactLayout.render( App, { yield: <Signup /> } );
    }
});

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        ReactLayout.render( App, { yield: <Login /> } );
    }
});

publicRoutes.route( '/recover-password', {
    name: 'recover-password',
    action() {
        ReactLayout.render( App, { yield: <RecoverPassword /> } );
    }
});

publicRoutes.route( '/reset-password/:token', {
    name: 'reset-password',
    action() {
        ReactLayout.render( App, { yield: <ResetPassword /> } );
    }
});
/*
 ------------------------ END GENERIC
 */



publicRoutes.route( '/posts/:slug', {
    name: 'singlePost',
    action( params ) {
        ReactLayout.render( App, { yield: <SinglePost slug={ params.slug } /> } );
    }
});

publicRoutes.route( '/tags/:tag', {
    name: 'tagIndex',
    action( params ) {
        ReactLayout.render( App, { yield: <PostsIndex tag={ params.tag } /> } );
    }
});

