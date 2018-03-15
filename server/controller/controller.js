module.exports = {
    getUser: (req, res) => {
        console.log("session", req.session.passport.user.userid)
        const userid = req.session.passport.user.userid;
        let db = req.app.get('db');
        db.find_user([userid]).then(user => {
            res.send(user[0]) 
        }).catch(e => console.log(e))
    },

    createFriend: (req,res) =>{
        const db = req.app.get('db');
        let {name} = req.body;
        console.log('name me', name)

        db.createFriend([name]).then(user => {
            res.send(user[0])
        }).catch(e=>console.log(e))
    },


    // 76D endpoint in server/server.js
    getFriends: (req, res, next) => {
        const db = app.get("db");
        const { userid } = req.params
        db.getFriends([userid])
            .then(houses => {
                console.log(houses)
                res.status(200).send(houses)
            })
    }

}