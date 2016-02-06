/**
 * Created by ibox on 02/02/16.
 */
Meteor.publish( 'items', function() {
    return Items.find({}, {limit:3});
});