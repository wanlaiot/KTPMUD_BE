import db from "../models/index";
require('dotenv').config();
let getAllTeam = (teamId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let teams = '';
            if (teamId === 'All') {
                teams = await db.Team.findAll({
                    attributes: {
                        // exclude:['password']
                    }
                })
            }
            if (teamId && teamId !== 'All') {
                teams = await db.Team.findOne({
                    where: { id: teamId },
                    attributes: {
                        // exclude:['password']
                    },


                })
            }
            resolve(teams)

        }
        catch (e) {
            reject(e);
        }
    });
}
let checkTeamName = (teamName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let team = await db.Team.findOne({
                where: {
                    name: teamName
                }
            })
            if (team) {
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
let createNewTeam = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkTeamName(data.name);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: "team was used,please use another name"
                })
            }
            if (check !== true) {
                await db.Team.create({
                    name: data.name,
                    description: data.description,
                    isActive: data.isActive,
                    deleteAt: data.deleteAt,
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
let deleteTeam = (teamId) => {
    return new Promise(async (resolve, reject) => {
        let team = await db.Team.findOne({
            where: { id: teamId }
        })
        if (!team) {
            resolve({
                errode: 2,
                errMessage: "the team isn't exist"
            })
        }
        await db.Team.destroy({
            where: { id: teamId }
        });
        await db.JoinTeam.destroy({
            where: { idTeam: teamId }
        });
        resolve({
            errCode: 0,
            message: "The team is deleted"
        })
    })
}
let updateTeamData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let team = await db.Team.findOne({
                where: { id: data.id },
                raw: false
            })
            if (team) {
                team.name = data.name;
                team.description = data.description;
                team.isActive = data.isActive;
                await team.save();
                resolve({
                    errCode: 0,
                    message: "Update success"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Team not found"
                });
            }

        }
        catch (e) {
            reject(e);
        }
    })
}

// let bulkCreateSchedule = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.arrSchedule || !data.teamId || !data.formatedDate) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: "Missing required param !"
//                 })
//             }
//             else {
//                 let schedule = JSON.parse(data.arrSchedule);
//                 // if(schedule && schedule.length > 0){
//                 //     schedule=schedule.map(item=>{
//                 //         item.maxNumber=MAX_NUMBER_SCHEDULE;
//                 //         return item;
//                 //     })
//                 // }
//                 let existing = await db.Schedule.findAll({
//                     where: { teamId: data.teamId, date: data.formatedDate },
//                     attributes: ['timeType', 'date', 'teamId', 'maxNumber'],
//                     raw: true
//                 });
//                 let toCreate = _.differenceWith(schedule, existing, (a, b) => {
//                     return a.timeType === b.timeType && +a.date === +b.date;
//                 });
//                 if (toCreate && toCreate.length > 0) {
//                     await db.Schedule.bulkCreate(
//                         toCreate
//                     );
//                 }
//                 resolve({
//                     errCode: 0,
//                     errMessage: "ok"
//                 });
//             }
//         }
//         catch (e) {
//             reject(e);
//         }
//     })
// }


// let getScheduleByDate = (teamId, date) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!teamId || !date) {
//                 resolve({
//                     erCode: 1,
//                     errMessage: 'Missing required parameters'
//                 })
//             }
//             else {
//                 let dataSchedule = await db.Schedule.findAll({
//                     where: {
//                         teamId: teamId,
//                         date: date
//                     }
//                 })
//                 if (!dataSchedule) dataSchedule = [];
//                 resolve({
//                     errCode: 0,
//                     data: dataSchedule
//                 })
//             }
//         }
//         catch (e) {
//             reject(e);
//         }
//     })
// }


module.exports = {
    getAllTeam: getAllTeam,
    createNewTeam: createNewTeam,
    deleteTeam: deleteTeam,
    updateTeamData: updateTeamData,
    // bulkCreateSchedule: bulkCreateSchedule,
    // getScheduleByDate: getScheduleByDate
}