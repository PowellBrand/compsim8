module.exports = {
    
        // 70K
        login: (req, res, next) =>{
            let {username} = req.body;
            const db = req.app.get('db');
            let users = db.getUsers().then(users=>{
    
                const user = users.find(user=> user.username === username);
                
                if (user) {
                    console.log(req.passport.session, "string cheese");
                    req.session.user.username = user.username;
                    res.status(200).send(req.session.user);
                }
                else {
                    res.status(403).send('You need to make an account');
                }
    
            }).catch(e=>console.log(e))
        },
    
    
        getUsers: (req,res)=>{
            req.app.get('db').getUsers().then(users=>{
                
                if (users===null){
                    res.json(users)
                }
                res.send(users)
            })
        },
        addUser: (req,res)=>{
            let {username} = req.body;
            req.app.get('db').addUser([username]).then(results=>{
                res.send("All Good.")
            })
        },
    
        deleteUser: (req,res)=>{
            let username = req.params.username;
            req.app.get('db').deleteUser([username]).then(results=>{
                res.send("deleted")
            })
        },

    }