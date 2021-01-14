const Knex = require('knex');
const moment = require('moment')
const pg = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-54-75-225-52.eu-west-1.compute.amazonaws.com',
        user: 'cnecdbjovqkure',
        password: '16bcd239f0e6829b1b41710d721a99f254d17987e488c4a7fdf9afa78a4556a3',
        database: 'd9rhvpdti09gr8'
    }
});

const up = async () => {
    // await pg.schema.dropTable('users');

    await pg.schema.createTable('users', table => {
        table.increments('id');
        table.string('name').notNull();
        table.string('surname').notNull();
        table.date('birthdate').notNull();
        table.string('gender').notNull();
        table.string('mail').notNull();
        table.string('phone').notNull();
        // table.primary('id');
    });
    await pg('users').insert([{
        name: "Robin",
        surname: "SENECHAL",
        birthdate: moment().format(),
        gender: 'male',
        mail: 'robin.senechal@gmail.com',
        phone: '01234567891',
    }, {
        name: "Lady",
        surname: "GAGA",
        birthdate: moment().format(),
        gender: 'female',
        mail: 'lady.gaga@gmail.com',
        phone: '01234567891',
    }, {
        name: "Francis",
        surname: "CABREL",
        birthdate: moment().format(),
        gender: 'male',
        mail: 'francis.cabrel@gmail.com',
        phone: '01234567891',
    }, {
        name: "Ri",
        surname: "HANNA",
        birthdate: moment().format(),
        gender: 'female',
        mail: 'ri.hanna@gmail.com',
        phone: '01234567891',
    }, {
        name: "Marc",
        surname: "LAVOINE",
        birthdate: moment().format(),
        gender: 'male',
        mail: 'marc.lavoine@gmail.com',
        phone: '01234567891',
    }])
};
const getBdd = async () => {
    return pg;
};

exports.default = {
    up,
    getBdd
};


