import db from '../models/index'

let getUser = async (req, res) => {
    try {
        const param = req.params.userID;
        const userData = await db.User.findByPk(parseInt(param), {
            raw: true,
        });
        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            roleId: userData.roleId[0]
        }
        console.log(user)
        return res.json({
            user
        })
        // return res.render('homepage.ejs', {
        //     data: JSON.stringify(data)
        // })
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getUser: getUser,
}