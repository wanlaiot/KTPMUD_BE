import db from "../models/index";
let getAllUserOnProject = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';

            users = await db.JoinProject.findAll({
                where: { idProject: projectId }
            })

            let user = [];
            for (let i = 0; i < users.length; i++) {
                let _user = await db.User.findOne({
                    where: { id: users[i].idUser },
                    attributes: {
                        exclude: ['password', 'image']
                    }
                })
                user[i] = _user;
            }
            resolve(user)

        }
        catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    getAllUserOnProject: getAllUserOnProject
}
