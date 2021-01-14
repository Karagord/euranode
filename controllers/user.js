const moment = require('moment')
const bdd = require('../utils/bdd')
class User {

    constructor(
        id,
        name,
        surname,
        birthdate,
        gender,
        mail,
        phone
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.gender = gender;
        this.mail = mail;
        this.phone = phone;

    }
    async createUser() {
        const pg = await bdd.default.getBdd();
        pg('users').insert({
            name: this.name,
            surname: this.surname,
            birthdate: this.birthdate,
            gender: this.gender,
            mail: this.mail,
            phone: this.phone
        })
    }
    async removeUser() {
        console.log(this)
    }
    async readUser(id) {
        const pg = await bdd.default.getBdd();
        const user = await pg('users as u').first().select('u.*').where('u.id', id)
        this.id = user.id;
        this.name = user.name;
        this.surname = user.surname;
        this.birthdate = user.birthdate;
        this.gender = user.gender;
        this.mail = user.mail;
        this.phone = user.phone;

    }

    async updateUser(profile) {
        const pg = await bdd.default.getBdd();

        const user = await pg('users as u').where('u.id', profile.id).update(
            {
                name: profile.name,
                surname: profile.surname,
                birthdate: profile.birthdate,
                gender: profile.gender,
                mail: profile.mail,
                phone: profile.phone,
            }
        )
        console.log("🚀 ~ file: user.js ~ line 63 ~ User ~ updateUser ~ user", user)
    }

}

async function getUsers() {
    const pg = await bdd.default.getBdd();

    const users = await pg('users as u').select('u.*');

    return users;

}

module.exports = {
    User,
    getUsers
};