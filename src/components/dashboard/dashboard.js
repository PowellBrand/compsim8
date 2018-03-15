import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer';
import Child from '../child/child'

class Dashboard extends Component {
    constructor(props) {
        super(props)

    }
    state = {
        title: 'Super Cool Title'

    }
    
    componentDidMount() {
        this.props.getUserInfo()
    }

    changeTitle = (newTitle) => {
        this.setState({
            title:newTitle
        });
    }

    render() {
        // 43G
        const user = this.props.user
        return (
            <div>
                <h1>{user.name}</h1>
                <Child doSomethingCool={this.changeTitle.bind(this, 'This was changed with props')} title={this.state.title} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Dashboard);