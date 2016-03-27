NewItem = React.createClass({
    propTypes: {
        lang: React.PropTypes.string.isRequired
    },
    componentDidMount() {
    },
    validationsFrom() {
        //todo: make editable only for the owner (or put some review process)
        let component = this;

        return {
            ignore: [],
            rules: {
                itemTitle: {
                    required: true
                },
                itemContent:{
                    required: true
                }
            },
            messages: {
                itemTitle: {
                    required: "Hang on there, an item title is required!"
                },
                itemContent:{
                    required: "Gosh...you again forgot your content!"
                },
                lang:{
                    required: "Hopla! Did you choose a language? (Careful, it will reset your fields)"
                }
            },
            submitHandler() {

                let { getValue, isChecked } = ReactHelpers;

                let form = component.refs.newItemForm.refs.form,
                    item = {
                        category:"todo",
                        from:"anegdot." + Meteor.settings.public.lang['main'].id,
                        content:{}
                    };
                item.content[component.props.lang] = {
                    author:Meteor.user()._id,
                    date: (new Date()).toISOString(),
                    origin: "anegdot.co",
                    text: getValue( form, '[name="itemContent"]' ),
                    title: getValue( form, '[name="itemTitle"]' )
                };

                Meteor.call( 'newCountryItem', item, ( error, response ) => {
                    if ( error ) {
                        Bert.alert( error.reason, 'danger' );
                    } else {
                        Bert.alert( 'Item saved!', 'success' );
                    }
                });
            }
        };
    },
    handleChangeGeneric(e){
        //console.log('Form element textTo changed', e.target.value);
        //this.setState({textTo: e.target.value});
    },
    handleSubmitFrom( event ) {
        event.preventDefault();
    },
    render() {

        //todo not working I think
        //let itemOwner = true;//(Meteor.user()._id === this.data.item.content[this.props.lang].author) ? true : false;
        let langFrom = this.props.lang;

        return (
            <div>
                <Form ref="newItemForm" id="newItemForm" className="newItemForm" validations={ this.validationsFrom() } onSubmit={ this.handleSubmitFrom }>
                    <FormGroup>
                        <FormElement //todo: add placeholder and tabIndex
                            showLabel={ true }
                            style="input"
                            type="text"
                            name="itemTitle"
                            label="Item Title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormElement //todo: add placeholder and tabIndex
                            showLabel={ true }
                            style="textarea"
                            type="text"
                            name="itemContent"
                            label="Item Content"
                        />
                    </FormGroup>
                    <input name="lang" value={langFrom} onChange={this.handleChangeGeneric} hidden/>
                    <div className="form-group">
                        <input type="submit" className="btn btn-warning" value="Post new item" tabIndex="6"/>
                    </div>
                </Form>

            </div>

        );
    }
});