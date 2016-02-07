/**
 * Created by ibox on 02/02/16.
 */
Meteor.publish( 'items', () =>  {
    return Items.find({}, {limit:3});
});

Meteor.publish( 'item', ( itemId ) => {
    check( itemId, String );
    return Items.find( { _id: itemId } );
});