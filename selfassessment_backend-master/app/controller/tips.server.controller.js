
const Tips= require('mongoose').model('Tips');
const User = require('mongoose').model('User');

exports.addTips= async( req,res) => {

  const nurseid= req.user._id;
  console.log(nurseid);

  console.log("tips here: " +req.body.tip);

  let nurseprofile= await User.findOne({ _id: nurseid});

  if(nurseprofile.role != 'Nurse'){
    res.status(401).send("Not Authorised");
  }
  else{
    const newtip= new Tips({
      nurseid: req.user._id,
      nursename: nurseprofile.firstName,
      tip: req.body.tip
    });

    
      await newtip.save();
      res.send(newtip);
    
  }

}

exports.getTips = async (req,res)=> {


  try{
    await Tips.find({}, (err,tips)=> {
      if(err){
        return next(err);
      }

      if(tips=== null){
        res.send('No tips yet');
      }
      if(tips.length >0){
        
     
        const random= Math.floor(Math.random() * tips.length) + 0;
        console.log(random);


        res.send(tips[random].tip);
        console.log(tips[0].tip);
      }
     

    })
  }
  catch{
    res.send["No tips yet"];
  }
}