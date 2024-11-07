import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    // attributes: ['email', 'role', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    let check1 = password === user.password;
                    console.log(check)
                    if (check || check1) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "user not found";

                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = "your email isn't exist in system";
            }
            resolve(userData)
        }
        catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail
                }
            })
            if (user) {
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
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        }
        catch (e) {
            reject(e);
        }
    });
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "email was used,please use another email"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    isActive: data.isActive,
                    password: hashPasswordFromBcrypt,
                    deleteAt: data.deleteAt,
                    //An lam
                    image: data.avatar,
                });
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errode: 2,
                errMessage: "the user isn't exist"
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            message: "The user is deleted"
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.role) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false


            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.phone = data.phone;

                //An Lam
                user.role = data.role;
                user.isActive = data.isActive;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                //An lam
                // await db.User.save({
                //     firstName:data.firstName,
                //     lastName:data.lastName,
                //     phone:data.phone,
                // })N
                await user.save();
                resolve({
                    errCode: 0,
                    message: "Update success"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found"
                });
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {
                        type: typeInput
                    }
                })
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }

        } catch (e) {
            reject(e)
        }
    })
}
let saveDetailInforMember = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.userId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        userId: inputData.userId,
                    })
                } else if (inputData.action === 'EDIT') {
                    let memberMarkdown = await db.Markdown.findOne({
                        where: { userId: inputData.userId },
                        raw: false
                    })
                    if (memberMarkdown) {
                        memberMarkdown.contentHTML = inputData.contentHTML;
                        memberMarkdown.contentMarkdown = inputData.contentMarkdown;
                        memberMarkdown.description = inputData.description;
                        memberMarkdown.updateAt = new Date()
                        await memberMarkdown.save()
                    }

                }


                resolve({
                    errCode: 0,
                    errMessage: 'Save infor member success!'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getDetailMemberById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Markdown }
                    ],
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
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    //An lam
    getAllCodeService: getAllCodeService,
    saveDetailInforMember: saveDetailInforMember,
    getDetailMemberById: getDetailMemberById,
}