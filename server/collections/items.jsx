/**
 * Created by ibox on 02/02/16.
 */
Meteor.publish( 'items', (lang, limit) =>  {
    return Items.find({["content." + lang]:{$exists: true}}, {limit:limit});
});

Meteor.publish( 'item', ( itemId ) => {
    //check( itemId, String );
    return Items.find( { _id: itemId } );
});

Meteor.publish( 'item-detail', ( itemId ) => {
    //check( itemId, String );
    return Items.find( { _id: itemId } );
});