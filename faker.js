require('dotenv').config()
const { faker } = require("@faker-js/faker");
const dbConnect = require("./src/db/db");
const userModel = require("./src/models/userModel");
const eventModel = require("./src/models/eventModel");
const bcrypt = require("bcrypt");

// Connect to DB
dbConnect().catch((err) => {
    console.log(err)
})

const users = 100
const event = 60
//const books = 5000

async function generate() {
    // const userList = []
    // for (let i = 0; i < users; i++) {
    //     const hashPassword = await bcrypt.hash(faker.internet.password(), 10);
    //     const newUser = new userModel({
    //         firstname: faker.internet.username(),
    //         lastname: faker.person.fullName(),
    //         phone: faker.phone.number({ style: 'national' }),
    //         email: faker.internet.email(),
    //         path: faker.image.avatar(),
    //         organization: faker.company.name(),
    //         position: faker.person.jobType(),
    //         role: 'user',
    //         gender: faker.helpers.arrayElement(['male', 'female']),
    //         password: hashPassword,
    //         dob: faker.date.birthdate(),
    //         address: faker.location.streetAddress()
    //     })
    //     userList.push(newUser.id)
    //     await newUser.save()
    //     console.log(`User with id: ${newUser.id} saved!`)
    // }
    for (let i = 0; i < event; i++) {
        
    // const randomId = ['675fa498748cc98ce81a1830','675fa2a0748cc98ce81a1820','675fa3df748cc98ce81a1828']
        // const randomId2 = userList[Math.floor(Math.random() * userList.length)]
        const event = new eventModel({
            title: faker.commerce.productDescription(),
            address: faker.location.streetAddress(),
            category:faker.helpers.arrayElement(['seminar', 'workshops','exhibition']),
            date: faker.date.soon(),
            description: faker.lorem.paragraphs(10),
            images: faker.image.urlLoremFlickr({ height: 720,width: 1080 }),
            key: faker.string.uuid(),
            uploadBy: '675fa78e748cc98ce81a183e',
        })
        await event.save()
        console.log(`event with id: ${event.id} saved!`)
    }
}
(async () => {
    await generate()
})();