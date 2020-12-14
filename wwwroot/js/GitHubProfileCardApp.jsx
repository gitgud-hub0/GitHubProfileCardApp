//improvements needed: handle errors
//1. Invalid Input
//2. Network Problems
//logic to fetch data and how to handle the data in a component, too much responsibility,
//app should not depend on a small library like axio but an agent-type module that has one
//responsibility to communicate with external apis and make your code only depdn on agent module
//Extract on change out

const testData = [
    { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
    { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
    { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
    </div>
);

class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = { userName: '' };
    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
    };

    render() {
        return (
            //ref={} is an id that reacts keep in memory that associates with a render element
            //onChange is useful when you need provide some feedback as the user is typing
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                    placeHolder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        )
    }
}

class App extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         profiles: testData
    //     };
    // }

    //not part of normal javascript, Babel translates this shortcut
    state = {
        profiles: [],
    };
    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }));
    };

    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

ReactDOM.render(
    <App title="The GitHub Cards App"/>,
    document.getElementById('content')
);