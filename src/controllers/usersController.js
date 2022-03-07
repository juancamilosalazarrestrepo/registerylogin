const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.JSON');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const { validationResult } = require('express-validator');


module.exports = {
    users:(req,res) =>{
        console.log(users);
        res.render("users",{
            
            users
        })

    },
   register:(req,res)=>{
      
    res.render("register");
    
   },

   store: (req, res) => {

    let errores = validationResult(req);
    if (errores.isEmpty()){
        if(req.file) {
    

            let newUser = {
                id: users[users.length - 1].id + 1,
                
                ...req.body,
                image: req.file.filename
            };
        
            users.push(newUser);
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        
            res.redirect('/users');
    
        }else{
            res.render("register");
        }
    }else{
        res.render("register",{
            errors : errores.mapped(),
            old: req.body
         });
        
    }
     
    console.log(req.body);

   
    
   
    
}
}