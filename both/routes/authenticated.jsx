/*
 ------------------------ GENERIC
 */
const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated'
});
/*
 ------------------------ END GENERIC
 */

authenticatedRoutes.route( '/items/:lang', {
    name: 'items',
    action(params) {
        ReactLayout.render( App, { yield: <ItemsList private={true} lang={params.lang}/> } );
    }
});

authenticatedRoutes.route( '/items/:lang/edit/:_id', {
    name: 'editor',
    action( params ) {
        ReactLayout.render( App, { yield: <Editor itemId={ params._id } lang={params.lang} /> } );
    }
});

authenticatedRoutes.route( '/account', {
    name: 'account',
    action() {
        ReactLayout.render( App, { yield: <Account /> } );
    }
});