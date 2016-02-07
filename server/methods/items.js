/**
 * Created by ibox on 06/02/16.
 */
Meteor.methods({
    newItem() {//to call when creating a new Item
        return Items.insert( {} ); //works thanks to schema
    },
    saveItem( item ) {
        check( item, Object );
        console.log(JSON.stringify(item));
        let itemId = item._id, lang = item.lang;
        delete item._id; //to delete the _id value we upsert, object lighter

        var itemCustom = {};
        itemCustom['content'] = {};
        itemCustom['content'][item.lang] = {};
        itemCustom['content'][item.lang] = {
            author: item.lang,
            date: Date.now(),
            origin: "http://www.anegdot.co",
            text: item.text,
            title: item.title
        };

        //var itemCustom = _.extend(item, temp);

        /*item.content[item.lang] = {
            "author": item.lang,
            "updated": Date.now(),
            "origine": "http://www.anegdot.co",
            "text": item.content,
            "title": item.title
        }*/

        console.log(JSON.stringify(itemCustom, null, 4));

        Items.upsert( itemId, { $set: itemCustom } );
    }
});