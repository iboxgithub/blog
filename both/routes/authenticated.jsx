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
        ReactLayout.render( App, { yield: <ItemsList lang={params.lang}/> } );
    }
});

authenticatedRoutes.route( '/items/:lang/new', {
    name: 'new-item',
    action( params ) {
        ReactLayout.render( App, { yield: <NewItem lang={params.lang} /> } );
    }
});

authenticatedRoutes.route( '/items/:lang/edit/:_id', {
    name: 'editor',
    action( params ) {
        ReactLayout.render( App, { yield: <Editor itemId={ params._id } lang={params.lang} /> } );
    }
});

authenticatedRoutes.route( '/items/:lang/detail/:_id', {
    name: 'item-detail',
    action(params) {
        ReactLayout.render( App, { yield: <ItemDetail itemId={ params._id } lang={params.lang}/> } ); //SPECIFIC (PostsIndex, Index...)
    }
});

authenticatedRoutes.route( '/account/:lang', {
    name: 'account',
    action(params) {
        ReactLayout.render( App, { yield: <Account lang={params.lang}/> } );
    }
});