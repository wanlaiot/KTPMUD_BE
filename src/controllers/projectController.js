
import projectService from '../services/projectService'

let createProject = async (req, res) => {
    try {
        let infor = await projectService.createProject(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// Long lam
let getDetailProjectById = async (req, res) => {
    try {
        let infor = await projectService.getDetailProjectById(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
//Long lam
let getAllProject = async (req, res) => {
    try {
        let infor = await projectService.getAllProject()
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteProject = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'khong co id truyen vao'
        })
    }
    let message = await projectService.deleteProject(req.body.id)
    console.log(message);
    return res.status(200).json(message);
}
// ham sua du lieu project
let handleEditProject = async (req, res) => {
    let data = req.body;
    let message = await projectService.updateProjectData(data);
    return res.status(200).json(message);

}
// ham tao mqh giua user va project
let handleJoinProject = async (req, res) => {

    let message = await projectService.joininProject(req.body)
    console.log(message);
    return res.status(200).json(message);
}
// ham xoa user trong project
let handleDeleteUserFromProject = async (req, res) => {
    let message = await projectService.deleteUserFromProject(req.body)
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {
    createProject: createProject,
    getAllProject: getAllProject,
    //chuyen
    handleDeleteProject: handleDeleteProject,
    handleEditProject: handleEditProject,
    handleJoinProject: handleJoinProject,
    handleDeleteUserFromProject: handleDeleteUserFromProject,
    getDetailProjectById: getDetailProjectById,
}