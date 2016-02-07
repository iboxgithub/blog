/**
 * Created by ibox on 06/02/16.
 */
//TODO: understand that
ReactHelpers = {
    getValue( context, selector ) {
        return context.querySelector( selector ).value;
    },
    setValue( context, selector, value ) {
        context.querySelector( selector ).value = value;
    },
    isChecked( context, selector ) {
        return context.querySelector( selector ).checked;
    },
    formatLastUpdate( date ) {
        if ( date ) {
            return moment( date ).format( 'MMMM Do, YYYY hh:mm a' );
        }
    }
};