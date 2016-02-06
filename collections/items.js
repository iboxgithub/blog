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
        label: "Is this post published?",
        autoValue() {
            if ( this.isInsert ) {
                return false;
            }
        }
    },
    "updated": {
        type: String,
        label: "The date this post was last updated on.",
        autoValue() {
            return ( new Date() ).toISOString();
        }
    },
    "title": {
        type: String,
        label: "The title of this post.",
        defaultValue: "Untitled Post"
    },
    "content": {
        type: String,
        label: "The content of this post.",
        optional: true
    },
    "tags": {
        type: [ String ],
        label: "The tags for this post.",
        optional: true
    }
});

Items.attachSchema( ItemsSchema );