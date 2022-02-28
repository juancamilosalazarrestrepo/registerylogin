const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.JSON');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    users:(req,res) =>{
        res.render("users")

    },
   register:(req,res)=>{
      
    res.render("register")
    
   },

   store: (req, res) => {
    console.log(req.body);
    
   
    let newUser = {
        id: users[users.length - 1].id + 1,
        
        ...req.body,
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

    res.redirect('/');
}
}