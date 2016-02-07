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

authenticatedRoutes.route( '/items/edit/:_id', {
    name: 'editor',
    action( params ) {
        ReactLayout.render( App, { yield: <Editor item={ params._id } /> } );
    }
});

authenticatedRoutes.route( '/account', {
    name: 'account',
    action() {
        ReactLayout.render( App, { yield: <Account /> } );
    }
});