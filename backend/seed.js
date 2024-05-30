const { addFile } = require('./models');

async function seedDatabase() {
    await addFile('testfile.pdf', new Date());  // Adjust parameters as necessary
    console.log('Data has been seeded');
}

seedDatabase();
