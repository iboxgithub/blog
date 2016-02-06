let login = ( options ) => {
    _validate( options.form);
};

let _validate = ( form, template ) => {
    $( form ).validate( validation( ) ); //meteor add themeteorchef:jquery-validation
};

let validation = () => {
    return {
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?'
            },
            password: {
                required: 'Need a password here.'
            }
        },
        submitHandler() { _handleLogin(); }
    };
};

let _handleLogin = () => { //jQuery automatically binds with the component > todo: how?
    let email    = $( '[name="emailAddress"]' ).val(),
        password = $( '[name="password"]' ).val();

    //console.log('test ' + email);

    Meteor.loginWithPassword( email, password, ( error ) => {
        if ( error ) {
        Bert.alert( error.reason, 'warning' );
    } else {
        Bert.alert( 'Logged in!', 'success' );
    }
});
};

Modules.client.login = login;