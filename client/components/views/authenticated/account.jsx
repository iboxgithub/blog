

Account = React.createClass({
    /*mixins: [ ReactMeteorData ],
    getMeteorData() {

    },
    componentDidMount() {
        //Modules.client.anegdot( { form: "#anegdot" } );
    },*/
    handleChangeGeneric(e){
        //console.log('Form element textTo changed', e.target.value);
        //this.setState({textTo: e.target.value});
    },
    handleSubmitUserInfo( event ) {
        event.preventDefault();
        console.log('User info update event');
    },
    handleSubmitStats( event ) {
        event.preventDefault();
        console.log('Stats update event');
    },
    handleSubmitNotifs( event ) {
        event.preventDefault();
        console.log('Notifs update event');
    },
    convertLang(lang){
        return Meteor.settings.public.lang[lang];
    },
    render() {

        //user infos
        let email = Meteor.user().emails[0].address,
            fullName = Meteor.user().profile.name,
            nativeLang = Meteor.user().profile.lang1,
            secondLang = Meteor.user().profile.lang2 ? Meteor.user().profile.lang2 : 'en';

        //stats
        let nb_translationsDone = 3,
            nb_newTranslationsTodo = 4,
            nb_totalTranslationsTodo = 18;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Account monitoring console
                </div>
                <div className="panel-body">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            User information
                        </div>
                        <div className="panel-body">
                            <form id="userInfo" className="userInfo" onSubmit={this.handleSubmitUserInfo}>
                                <label htmlFor="fullName">Full name</label>
                                <input type="text" name="fullName" className="form-control"
                                       value={fullName} placeholder="Full name" onChange={this.handleChangeGeneric}/>

                                <label htmlFor="emailAddress">Email Address</label>
                                <input type="email" name="emailAddress" className="form-control"
                                       value={email} onChange={this.handleChangeGeneric}/>

                                <label htmlFor="nativeLang">Native language</label>
                                <input type="text" name="nativeLang" className="form-control"
                                       value={this.convertLang(nativeLang)} placeholder="Native language" onChange={this.handleChangeGeneric}/>

                                <label htmlFor="secondLang">Second language</label>
                                <input type="text" name="secondLang" className="form-control"
                                       value={this.convertLang(secondLang)} placeholder="Second language (English by default)" onChange={this.handleChangeGeneric}/>

                                <div className="form-group">
                                    <input type="submit" className="btn btn-success" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Statistics
                        </div>
                        <div className="panel-body">
                            todo (charts n stuff)
                            <form id="stats" className="stats" onSubmit={this.handleSubmitStats}>
                                <label htmlFor="nb_translationsDone">Translations done</label>
                                <input type="text" name="nb_translationsDone" className="form-control"
                                       defaultValue={nb_translationsDone} placeholder="0"/>

                                <label htmlFor="nb_newTranslationsTodo">Translations to do: new since last login</label>
                                <input type="text" name="nb_newTranslationsTodo" className="form-control"
                                       defaultValue={nb_newTranslationsTodo} placeholder="0"/>

                                <label htmlFor="nb_totalTranslationsTodo">Translations to do: total amount</label>
                                <input type="text" name="nb_totalTranslationsTodo" className="form-control"
                                       defaultValue={nb_totalTranslationsTodo} placeholder="0"/>

                                <div className="form-group">
                                    <input type="submit" className="btn btn-success" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Notifications
                        </div>
                        <div className="panel-body">
                            <form id="notifs" className="notifs" onSubmit={this.handleSubmitNotifs}>
                                <label htmlFor="privMessages">Private messages</label>
                                <input type="text" name="privMessages" className="form-control"
                                       defaultValue="todo"/>

                                <label htmlFor="comments">Comments</label>
                                <input type="text" name="comments" className="form-control"
                                       defaultValue="todo"/>

                                <div className="form-group">
                                    <input type="submit" className="btn btn-success" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});