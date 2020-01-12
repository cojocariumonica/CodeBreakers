var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var settings = require('../config/settings');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'BugReporting'
});
connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ... nn");
  } else {
      console.log("Error connecting database ... nn");
  }
  });

var setpermission = function(req,res,next)
{  
    
    res.setHeader('Access-Control-Allow-Methods', '*')

    res.setHeader('Access-Control-Allow-Origin', '*')

//        res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type,Authentication,Accept')
res.setHeader('Access-Control-Allow-Headers', '*')        
        res.setHeader('Access-Control-Allow-Credentials', true);  
next();  
}

//GET TOKEN
getToken = function (headers) {
    console.log("headers"+headers);
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  
  router.options('/token',setpermission,function(req,res,next){
    res.end('results')
  })
  
  router.get('/token', setpermission, function(req, res) {
    var token = getToken(req.headers);
    console.log(token)
    if (token) {
        res.json({success: true,token:token,msg:'Authorized'})
    } else {
      return res.json({success: false, msg: 'Unauthorized'});
    }
  });

router.options('/register',setpermission,function(req,res,next){
    res.end('results')
  })
  
router.post('/register',setpermission, function(req, res) {

        var users={
            "email":req.body.email,
            "password":req.body.password,
            "type":req.body.type,
          }

        connection.query('INSERT INTO accounts SET ?',users, function (error, results, fields) {
            if (error) {
                return res.json({success: false, msg: 'Username already exists.'});
            }else{
              res.json({success: true, msg: 'Successful created new user.'});
            }
            });

    });

router.options('/login',setpermission,function(req,res,next){
    res.end('results')
    })

router.post('/login',setpermission, function(req, res) {
    var email= req.body.email;
    var password = req.body.password;
    var type = req.body.type;

    connection.query('SELECT * FROM accounts WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password && results[0].type == type ){
            // if user is found and password is right create a token
            var token = jwt.sign(fields.toString(), settings.secret);
            // return the information including token as JSON
            res.json({success: true,type:results[0].type,token: 'JWT ' + token});
        }
        else{
            res.json({success: false});
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
            });
      }
    }
});

});

router.options('/addProject',setpermission,function(req,res,next){
    res.end('results')
  })
  
router.post('/addProject',setpermission, function(req, res) {

        var project={
            "project_name":req.body.name,
            "description":req.body.description,
            "repository":req.body.repository,
            "project_team":req.body.team,
          }

        connection.query('INSERT INTO projects SET ?',project, function (error, results, fields) {
            if (error) {
                console.log("error ocurred",error);
                return res.json({success: false, msg: 'project already exists.'});
            }else{
            console.log('The solution is: ', results);
              res.json({success: true, msg: 'Successful created new project.'});
            }
            });

});

router.options('/addBug',setpermission,function(req,res,next){
    res.end('results')
  })
  
router.post('/addBug',setpermission, function(req, res) {

        var bug={
            "bug":req.body.bug,
            "severity":req.body.severity,
            "description":req.body.description,
            "link":req.body.link,
            "allocate":req.body.allocate,
            "status":req.body.status,
            "project_id":req.body.project_id,
          }

        connection.query('INSERT INTO bugs SET ?',bug, function (error, results, fields) {
            if (error) {
                console.log("error ocurred",error);
                return res.json({success: false, msg: 'project already exists.'});
            }else{
            console.log('The solution is: ', results);
              res.json({success: true, msg: 'Successful created new project.'});
            }
            });

});

router.options('/updateBug',setpermission,function(req,res,next){
    res.end('results')
  })
  
router.post('/updateBug',setpermission, function(req, res) {

    console.log(req.body)
        var bug={
            "bug":req.body.bug,
            "severity":req.body.severity,
            "description":req.body.description,
            "link":req.body.link,
            "allocate":req.body.allocate,
            "status":req.body.status,
            "project_id":req.body.project_id,
          }

        connection.query('UPDATE bugs SET ? WHERE id = ?',[bug,req.body.id], function (error, results, fields) {
            if (error) {
                console.log("error ocurred",error);
                return res.json({success: false, msg: 'update fail'});
            }else{
            console.log('The solution is: ', results);
              res.json({success: true, msg: 'update success'});
            }
            });

});

router.options('/getProjects',setpermission,function(req,res,next){
    res.end('results')
  })
  
  router.get('/getProjects', setpermission, function(req, res) {
   
    connection.query('SELECT * from projects', function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            return res.json({success: false, msg: 'project already exists.'});
        }else{
        console.log('The solution is: ', results);
          res.json({success: true, msg: 'Successful created new project.',tableData:results});
        }
        });

  });

router.options('/getBugs/:project_id',setpermission,function(req,res,next){
    res.end('results')
  })

router.get('/getBugs/:project_id', setpermission, function(req, res) {
        console.log(req.params.project_id)
    connection.query('SELECT * from bugs WHERE project_id = ?',req.params.project_id, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            return res.json({success: false, msg: 'project already exists.'});
        }else{
        console.log('The solution is: ', results);
          res.json({success: true, msg: 'Successful recieved bugs',tableData:results});
        }
        });

  });

module.exports = router;