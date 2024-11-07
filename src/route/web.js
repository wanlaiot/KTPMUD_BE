
import express from "express";
import homeControllor from "../controllers/homeController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import teamController from "../controllers/teamController";
import jointeamController from "../controllers/jointeamController";
import joinprojectController from "../controllers/joinprojectController"


let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeControllor.getHomePage);
    router.get("/abc", (req, res) => {
        return res.send("helloabc")
    });
    router.get("/crud", homeControllor.getCRUD);
    router.post("/post-crud", homeControllor.postCRUD);
    router.get("/get-crud", homeControllor.displayGetCRUD);
    router.get("/edit-crud", homeControllor.getEditCRUD);
    router.post('/put-crud', homeControllor.putCRUD);
    router.get('/delete-crud', homeControllor.deleteCRUD);


    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    //An lam
    router.get('/api/allcode', userController.getAllCode)
    router.post('/api/save-infor-members', userController.postInforMember)
    router.get('/api/get-all-project', projectController.getAllProject)
    router.post('/api/create-new-project', projectController.createProject)

    router.get('/api/get-detail-member-by-id', userController.getDetailMemberById)
    //An Lam

    //team
    router.get('/api/get-all-team', teamController.handleGetAllTeams);
    router.post('/api/create-new-team', teamController.handleCreateNewTeam);
    router.put('/api/edit-team', teamController.handleEditTeam);
    router.delete('/api/delete-team', teamController.handleDeleteTeam);

    router.get('/api/get-all-user-team', jointeamController.handleGetAllUserOnTeam);
    router.post('/api/add-user-team', jointeamController.handleAddUserOnTeam);
    router.delete('/api/delete-user-team', jointeamController.handleDeleteUserOnTeam);
    router.get('/api/get-detail-team-by-id', teamController.getDetailTeamById)

    //team

    //project
    // router.post("/api/loginProject", projectController.handleLoginProject);
    router.put('/api/edit-project', projectController.handleEditProject);
    router.delete('/api/delete-project', projectController.handleDeleteProject);
    router.post('/api/add-user-project', projectController.handleJoinProject);
    router.delete('/api/delete-userfromproject', projectController.handleDeleteUserFromProject);
    router.get('/api/get-all-user-project', joinprojectController.handleGetAllUserOnProject);
    //project
    //Long lam
    router.get('/api/get-detail-project-by-id', projectController.getDetailProjectById)
    // Long lam

    return app.use("/", router);
}
module.exports = initWebRoutes;