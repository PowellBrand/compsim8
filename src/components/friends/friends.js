import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {getUserInfo} from '../../ducks/reducer'


class Friends extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            email: ''
        }

    }

    componentWillMount() {
        axios.get('/api/getFriends').then(res => {
            console.log(res.data)
            this.setState({
                username: res.data,
                email: res.data
            })
        })
    }

    showFriends(friend) {
        console.log(friend.name, friend.location)
        return (
            <div>
                <p>Friend's username: {friend.username}</p>
                <p>Friend's email: {friend.email}</p>
            </div>

        )
    }





    render() {
       var eightyThreeF = this.state.friends.map(friend => {
           return this.showFriends(friend)
       })
        

        return (
            <div>
                {showFriends}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.user,
        

    }
}
export default connect(mapStateToProps, {getUserInfo })(Friends)