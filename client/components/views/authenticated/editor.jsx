Editor = React.createClass({
    propTypes: {
        itemId: React.PropTypes.string.isRequired,
        lang: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            langTo: ''//, //todo: put user favorite lang
        };
    },
    mixins: [ ReactMeteorData ],
    getMeteorData() {
        let sub = Meteor.subscribe( 'item', this.props.itemId );
        var item = Items.findOne( { _id: this.props.itemId } );

        return {
            item: item
            //subReady: sub.ready()
        };
    },
    componentDidMount() {
        //console.log('lang ' + this.props.lang);
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
                },
                lang:{
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

                let form = component.refs.editItemFormFrom.refs.form,
                    item = {
                        _id: component.props.itemId,
                        author:Meteor.user()._id,
                        title: getValue( form, '[name="itemTitle"]' ),
                        text: getValue( form, '[name="itemContent"]' ),
                        //publishedTo: isChecked( form, '[name="itemPublishedFrom"]' ),
                        //todo: [langTo] When we loose session we keep the good dropdown value BUT the session is reseted so EN everytime
                        lang: component.props.lang
                    };

                Meteor.call( 'saveItem', item, ( error, response ) => {
                    if ( error ) {
                        Bert.alert( error.reason, 'danger' );
                    } else {
                        Bert.alert( 'Item saved!', 'success' );
                    }
                });
            }
        };
    },
    /*handleChangeTitleFrom(e){
        //console.log('Form element titleTo changed', e.target.value);
        this.setState({titleFrom: e.target.value});
    },
    handleChangeTextFrom(e){
        //console.log('Form element textTo changed', e.target.value);
        this.setState({textFrom: e.target.value});
    },*/
    validationsTo() {
        //console.log('rre');
        let component = this;

        return {
            ignore: [],
            rules: {
                itemTitle: {
                    required: true
                },
                itemContent:{
                    required: true
                },
                lang:{
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

                let form = component.refs.editItemFormTo.refs.form,
                    item = {
                        _id: component.props.itemId,
                        author:Meteor.user()._id,
                        title: component.state.titleTo,
                        text: component.state.textTo,
                        //published: isChecked( form, '[name="itemPublishedTo"]' ),
                        //todo: [langTo] When we loose session we keep the good dropdown value BUT the session is reseted so EN everytime
                        lang: component.state.langTo
                    };

                Meteor.call( 'saveItem', item, ( error, response ) => {
                    if ( error ) {
                        Bert.alert( error.reason, 'danger' );
                    } else {
                        Bert.alert( 'Item saved!', 'success' );
                    }
                });
            }
        };
    },
    dropdownCallbackTo(value) {
        //console.log('Dropdown changed',value);
        this.setState({langTo: value}); //todo: understand why the setState function is so long that we need to use the variable value (it looks like it is just set at the end)
        let //publishedTo = this.data.item.content[value] && this.data.item.content[value].published,
            titleTo = this.data.item.content[value] && this.data.item.content[value].title,
            textTo = this.data.item.content[value] && this.data.item.content[value].text;
        this.setState({
            //publishedTo: titleTo,
            titleTo: titleTo,
            textTo: textTo
        });
    },
    handleChangePublishedTo(e){
        console.log('Form element publishedTo changed', e.target.value);
        this.setState({publishedTo: e.target.value});
    },
    handleChangeTitleTo(e){
        //console.log('Form element titleTo changed', e.target.value);
        this.setState({titleTo: e.target.value});
    },
    handleChangeTextTo(e){
        //console.log('Form element textTo changed', e.target.value);
        this.setState({textTo: e.target.value});
    },
    handleChangeGeneric(e){
        //console.log('Form element textTo changed', e.target.value);
        //this.setState({textTo: e.target.value});
    },
    handleSubmitTo( event ) {
        event.preventDefault();
    },
    handleSubmitFrom( event ) {
        event.preventDefault();
    },
    getLastUpdate() {
        if ( this.data ) {
            let { formatLastUpdate } = ReactHelpers,
                item                 = this.data.item;

            //return `${ formatLastUpdate( item.updated ) } by ${ item.author }`;
            return `${ formatLastUpdate( item.updated ) }`;
        }
    },
    render() {

        if ( !this.data.item ) { return <div>Item loading...</div>; }


        //todo not working I think
        let itemOwner = true;//(Meteor.user()._id === this.data.item.content[this.props.lang].author) ? true : false;
        let langFrom = this.props.lang;
        let langTo = 'sk'; //todo: put user favorite lang --> different then the State because it will not get rerendered at every change and will not cause an Invariant Violation
        var boundClickTo = this.dropdownCallbackTo.bind(this);//todo: understand how to avoid warning

        return (
            <div>
                <div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <td>
                                From
                            </td>
                            <td>
                                To
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                {this.props.lang}
                            </td>
                            <td>
                                <Dropdown lang={langTo} src="To" callback={boundClickTo}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <table>
                    <thead>
                        <tr>
                            <td>
                                Item  to translate
                            </td>
                            <td>
                                Translation
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form ref="editItemFormFrom" id="editItemFormFrom" className="editItemFormFrom" validations={ this.validationsFrom() } onSubmit={ this.handleSubmitFrom }>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="input"
                                            type="text"
                                            name="itemTitle"
                                            label="Item Title"
                                            defaultValue={ this.data.item.content[langFrom] && this.data.item.content[langFrom].title }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="textarea"
                                            type="text"
                                            name="itemContent"
                                            label="Item Content"
                                            defaultValue={ this.data.item.content[langFrom] && this.data.item.content[langFrom].text }
                                        />
                                    </FormGroup>
                                    <input name="lang" value={langFrom} onChange={this.handleChangeGeneric} hidden/>
                                    { itemOwner ?
                                        <div className="form-group">
                                            <input type="submit" className="btn btn-warning" value="Update source" tabIndex="6"/>
                                        </div> : ''
                                    }
                                </Form>
                            </td>
                            <td>
                                {
                                    //<Dropdown lang={langTo} src="To" callback={boundClickTo}/>
                                     }
                                <Form ref="editItemFormTo" id="editItemFormTo" className="editItemFormTo" validations={ this.validationsTo() } onSubmit={ this.handleSubmitTo }>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="input"
                                            type="text"
                                            name="itemTitle"
                                            label="Item Title"
                                            onChange={ this.handleChangeTitleTo }
                                            value={this.state.titleTo}
                                            //defaultValue={ this.data.item.content[this.state.langTo] && this.data.item.content[this.state.langTo].title }
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormElement //todo: add placeholder and tabIndex
                                            showLabel={ true }
                                            style="textarea"
                                            type="text"
                                            name="itemContent"
                                            label="Item Content"
                                            onChange={ this.handleChangeTextTo }
                                            value={this.state.textTo || ''}
                                            // required for reset form to work (only on textarea's)
                                            // see: https://github.com/facebook/react/issues/2533
                                        />
                                    </FormGroup>
                                    <input name="lang" value={this.state.langTo} onChange={this.handleChangeGeneric} hidden/>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-warning" value="Save translation" tabIndex="6"/>
                                    </div>
                                </Form>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="updated-date">
                    <strong>Last Update:</strong> { this.getLastUpdate() }
                </p>
            </div>

        );
    }
});