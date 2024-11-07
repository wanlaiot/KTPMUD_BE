import jointeamService from "../services/jointeamService";

let handleAddUserOnTeam = async (req, res) => {
  let data = req.body;
  let message = await jointeamService.addUserOnTeam(data);
  return res.status(200).json(message);
}
let handleDeleteUserOnTeam = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requires parameters"
    })
  }
  let message = await jointeamService.deleteUserOnTeam(req.body.id);
  return res.status(200).json(message);
}
let handleGetAllUserOnTeam = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing requires parameters',
      users: []
    })
  }
  let users = await jointeamService.getAllUserOnTeam(id);
  console.log(users)
  return res.status(200).json({
    errCode: 0,
    errMessage: 'get users success',
    users
  })
}
module.exports = {
  handleAddUserOnTeam: handleAddUserOnTeam,
  handleDeleteUserOnTeam: handleDeleteUserOnTeam,
  handleGetAllUserOnTeam: handleGetAllUserOnTeam
}