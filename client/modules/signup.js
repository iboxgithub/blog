/**
 * Created by ibox on 25/01/16.
 */
let signup = ( options ) => {
    _validate( options.form );
};

let _validate = ( form ) => {
    $( form ).validate( validation() ); //meteor add themeteorchef:jquery-validation
};

let validation = () => {
    return {
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            },
            password: {
                required: 'Need a password here.',
                minlength: 'Use at least six characters, please.'
            }
        },
        submitHandler() { _handleSignup(); }
};
};

let _handleSignup = () => {
    let user = {
        email: $( '[name="emailAddress"]' ).val(),
        password: $( '[name="password"]' ).val(),
        profile:{
            lang1:'en',
            lang2:'fr'
        }
    };

    Accounts.createUser( user, ( error ) => {
            if ( error ) {
            Bert.alert( error.reason, 'danger' );
        } else {
            Bert.alert( 'Welcome!', 'success' );
        }
    });
};

Modules.client.signup = signup;