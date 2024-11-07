import db from "../models/index";

// tao project
let createProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Project.create({
                    image: data.imageBase64,
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// Long lam lay detail project
let getDetailProjectById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Project.findOne({
                    where: {
                        id: inputId
                    },
                    // attributes: ['name', 'descriptionHTML', 'descriptionMarkdown'],
                    attributes: {},
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
                // if (data) {
                //     let userProject = [];
                //     userProject = await db.User_Infor.findAll({
                //         where: { projectId: inputId},
                //         attributes: ['userId'],
                //     })
                //     data.userProject = userProject;
                // } else data = {}
            }

        } catch (e) {
            reject(e)
        }
    })
}
// Long lam lay detail project


//lay het project
let getAllProject = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Project.findAll()
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }

            resolve({
                errMessage: 'Ok',
                errCode: 0,
                data,
            })
        } catch (e) {
            reject(e)
        }


    })
}

//ham check name project ton tai
// let checkNameProject = (nameProject) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let projectData = {};
//             let name = await db.Project.findOne({
//                 //attributes:['name','description','status','startTime','income',],
//                 where: {
//                     name: nameProject
//                 },
//                 raw: true
//             })
//             if (name) {

//                 projectData.errCode = 0;
//                 projectData.errMessage = "Da tim thay project";
//                 projectData.project = name

//             }
//             else {

//                 projectData.errCode = 1;
//                 projectData.errMessage = "Khong tim thay project"

//             }
//             resolve(projectData)
//         }
//         catch (e) {
//             reject(e);
//         }
//     })
// }


// ham xoa project
let deleteProject = (projectId) => {
    return new Promise(async (resolve, reject) => {
        let project = await db.Project.findOne({
            where: { id: projectId },
            //raw:false
        })
        if (!project) {
            resolve({
                errCode: 2,
                errMessage: "Project khong ton tai"
            })
        }
        await db.Project.destroy({
            where: { id: projectId }
        })
        resolve({
            errCode: 0,
            errMessage: "Project da duoc xoa"
        })

    })
}
//sua project
let updateProjectData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "khong co id truyen vao hehe"
                })
            }
            let project = await db.Project.findOne({
                where: { id: data.id },
                raw: false

            })
            if (project) {
                project.name = data.name;
                project.image = data.imageBase64,
                    project.descriptionHTML = data.descriptionHTML,
                    project.descriptionMarkdown = data.descriptionMarkdown
                // project.description = data.description;
                // project.status = data.status;
                // project.startTime = data.startTime;
                // project.income = data.income;
                await project.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update thanh cong"
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Project khong tim thay"
                });
            }

        }
        catch (e) {
            reject(e);
        }

    })
}

let joininProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.idProject || !data.idUser) {
                resolve({
                    errCode: 2,
                    errMessage: "Nhap thieu thong tin "
                })
            }
            let user = await db.User.findOne({
                where: { id: data.idUser },
                raw: false

            })
            let project = await db.Project.findOne({
                where: { id: data.idProject },
                raw: false

            })
            if (user && project) {
                // let check = await checkjoinProject(data.idProject, data.idUser);
                if (false) {
                    resolve({
                        errCode: 5,
                        errMessage: "User da co trong project tu truoc"

                    })
                }
                else {

                    await db.JoinProject.create({
                        idUser: data.idUser,
                        idProject: data.idProject
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Them user vao project thanh cong"
                    })
                }
            } if (user && !project) {
                resolve({
                    errCode: 1,
                    errMessage: "Project khong tim thay"
                });
            }
            if (!user && project) {
                resolve({
                    errCode: 1,
                    errMessage: "User khong tim thay"
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Project va User deu khong tim thay"
                });
            }

        }
        catch (e) {
            reject(e);
        }

    })
}

//joinProject
let checkjoinProject = (idofUser, idofProject) => {
    return new Promise(async (resolve, reject) => {
        try {

            let idUser = await db.JoinProject.findOne({

                where: {
                    idUser: idofUser
                },
                raw: true
            })
            let idProject = await db.JoinProject.findOne({

                where: {
                    idProject: idofProject
                },
                raw: true
            })
            if (idUser && idProject) {

                resolve(true)

            }
            else {
                resolve(false)
            }

        }
        catch (e) {
            reject(e);
        }
    })
}

// ham xoa user trong project
let deleteUserFromProject = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.idUser || !data.idUser) {
                resolve({
                    errCode: 2,
                    errMessage: "Nhap thieu thong tin "
                })
            }
            let project = await db.JoinProject.findOne({
                where: { idProject: data.idProject },
                //raw:false
            })
            let userOnProject = await db.JoinProject.findOne({
                where: {
                    idProject: data.idProject,
                    idUser: data.idUser
                },
                //raw:false
            })
            if (!project) {
                resolve({
                    errCode: 1,
                    errMessage: "khong ton tai Project"
                })
            }
            if (!userOnProject) {
                resolve({
                    errCode: 1,
                    errMessage: "khong ton tai user trong project"
                })
            }
            await db.JoinProject.destroy({
                where: {
                    idProject: data.idProject,
                    idUser: data.idUser
                }
            })
            resolve({
                errCode: 0,
                errMessage: "Xoa user khoi project thanh cong"
            });
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createProject: createProject,
    getAllProject: getAllProject,
    // checkNameProject: checkNameProject,
    deleteProject: deleteProject,
    updateProjectData: updateProjectData,
    joininProject: joininProject,
    deleteUserFromProject: deleteUserFromProject,
    getDetailProjectById: getDetailProjectById
}