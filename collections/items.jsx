/**
 * Created by ibox on 31/01/16.
 */
Items = new Mongo.Collection( 'anegdots' );

Items.allow({
    insert: () => false,
    update: () => false,
    remove: () => false
});

Items.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

let ItemsSchema = new SimpleSchema({
    "published": {
        type: Boolean,
        label: "Is this item published",
        optional: true,
        autoValue() {
            if ( this.isInsert ) {
                return false;
            }
        }
    },
    /*"author": {
        type: String,
        label: "The ID of the author of this item.",
        autoValue() {
            let user = Meteor.users.findOne( { _id: this.userId } );
            if ( user ) {
                return 'toto';//`${ user.profile.name.first } ${ user.profile.name.last }`;
            }
        }
    },*/
    "updated": {
        type: String,
        label: "The date this item was last updated on",
        autoValue() {
            return ( new Date() ).toISOString();
        }
    },
    "category": {
        type: String,
        label: "The category of this item",
        autoValue() {
            return 'Autres';
        }
    },
    "content": {
        type: Object,
        label: "The content of this item",
        blackbox:true, //to avoid defining all fields (dynamic for languages)
        optional: true
    }
});

Items.attachSchema( ItemsSchema );