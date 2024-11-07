import joinprojectService from "../services/joinprojectService";

let handleGetAllUserOnProject = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing requires parameters',
            users: []
        })
    }
    let users = await joinprojectService.getAllUserOnProject(id);
    console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get users success',
        users
    })
}

module.exports = {
    handleGetAllUserOnProject: handleGetAllUserOnProject
}