/*
 ------------------------ GENERIC
 */
const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated'
});
/*
 ------------------------ END GENERIC
 */

authenticatedRoutes.route( '/items', {
    name: 'items',
    action() {
        ReactLayout.render( App, { yield: <ItemsList private={true}/> } );
    }
});

authenticatedRoutes.route( '/account', {
    name: 'account',
    action() {
        ReactLayout.render( App, { yield: <Account /> } );
    }
});

authenticatedRoutes.route( '/posts/:_id/edit', {
    name: 'editor',
    action( params ) {
        ReactLayout.render( App, { yield: <Editor post={ params._id } /> } );
    }
});