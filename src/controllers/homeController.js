 import db from '../models/index';
 import CRUDService from '../services/CRUDService';
 
 let getHomePage=async(req,res)=>{
  try{
    let data =await db.User.findAll();
  return res.render('homePage.ejs',{data:JSON.stringify(data)});
  }
  catch(e){
    console.log(e)
  }
  
}

 let getCRUD=async(req,res)=>{
   return res.render("crud.ejs");
 }
 let postCRUD=async(req,res)=>{
  let message=await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post ok")
}

let displayGetCRUD=async(req,res)=>{
  let data=await CRUDService.getAllUser();
  console.log(data)
  return res.render('displayCRUD.ejs',{
    dataTable:data
  });
}

let getEditCRUD=async(req,res)=>{
  let userId=req.query.id;
  if(userId){
    let userData= await CRUDService.getUserInfoById(userId);
    return res.render('editCRUD.ejs', {
      user: userData
    });
  }
  else{
    return res.send('user faild');
  }
}

let putCRUD=async(req,res)=>{
  let data=req.body;
  let allUser=await CRUDService.updateUserData(data);
  return res.render('displayCRUD.ejs',{
    dataTable: allUser
  })
}

let deleteCRUD=async(req,res)=>{
  let id=req.query.id;
  if(id){
  await CRUDService.deleteUserById(id);
  return res.send('delete ok')
  }
  else{
    return res.send('faild')
  }
}
module.exports={
    getHomePage:getHomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}