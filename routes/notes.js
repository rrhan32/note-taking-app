// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const Users=require('../models/login')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv');
dotenv.config();


router.use(cookieParser());
const saltRounds=10;
const create_token=(id)=>{
  return jwt.sign({id},process.env.ACCESS_TOKEN_KEY ,{expiresIn:'3h'});
}
const verifytoken=(req,res,next)=>
{
  // console.log(req.cookies.jwt);

  const token=req.cookies.jwt;
  if (!token) {
      return res.status(401).send("unauthorised");
  }

  jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(e,decoded)=>
  {
      if (e){
          return res.status(403).json({message:'Forbidden Access'})
      }
      else{
          req.user=decoded;
      next();
      }
  })
  
 
}
// TODO: Implement your API endpoints here

// Create Account
router.post('/create_account',async(req,res)=>
    {
     try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log('Hashed Password:', hashedPassword);
        let newuser= req.body;
        newuser.password=hashedPassword;
        delete newuser.confirmPassword;
        console.log(newuser);
        const New_User=new Users(newuser);
        await New_User.save();
        const token = create_token(New_User._id);
        console.log("saved");
        res.cookie("jwt",token);
        console.log("successfully created the token");
        res.status(201).send(New_User);
        }
        catch(e){
            res.status(500).send(e);
        }

    })

  // Login 
  router.post('/login',async(req,res)=>{
    try{
        console.log(req.body);
    const user=await Users.findOne({email:req.body.email});
    console.log("user is",user);
    if (!user)
    {
      
        res.status(404).json({message:"given id does not exist"});
    }
    
    
    const isPasswordValid= bcrypt.compare(req.body.password,user.password)
    if (isPasswordValid) {
        // Passwords match, user is authenticated
        const token=create_token(user._id);
        res.cookie('jwt',token);
        res.status(200).send("login successfull");
      } else {
        res.json({error:"Password does not match"});
        // Passwords do not match
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Incorrect email or password',
    //         text: 'Please try again.',
    //   })
    //   console.log(Swal.fire);
    }
    }
     catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/logout',(req,res)=>
 {
    res.cookie('jwt',"",{maxAge:100000})
    res.send("logout successfull")
})

// Create Note
router.post('/', async (req, res) => {
    try {
      const note = await Note.create(req.body);
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Retrieve Notes
  router.get('/',verifytoken, async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Retrieve Single Note
  router.get('/:id',verifytoken, async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      res.json(note);
    } catch (error) {
      res.status(404).json({ error: 'Note not found' });
    }
  });
  
  // Update Note
  router.put('/:id',verifytoken, async (req, res) => {
    try {
      const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(note);
    } catch (error) {
      res.status(404).json({ error: 'Note not found' });
    }
  });
  
  // Delete Note
  router.delete('/:id',verifytoken, async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      console.log("Note is",note);
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'Note not found' });
    }
  });


module.exports = router;
