import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'error input'

    })
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {

    }
  })
}

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUser(id);
  // console.log(users)
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    users
  })
}

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requires parameters"
    })
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
}


//An lam
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type)
    // console.log(data)
    return res.status(200).json(data)
  } catch (e) {
    console.log('Get all code error: ', e)
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server'
    })
  }
}
let postInforMember = async (req, res) => {
  try {
    let response = await userService.saveDetailInforMember(req.body)
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server'
    })
  }
}

let getDetailMemberById = async (req, res) => {
  try {
    let infor = await userService.getDetailMemberById(req.query.id)
    return res.status(200).json(infor)
  } catch (e) {
    console.log(e)
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server'
    })
  }
}
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  //An lam
  getAllCode: getAllCode,
  postInforMember: postInforMember,
  getDetailMemberById: getDetailMemberById,
}