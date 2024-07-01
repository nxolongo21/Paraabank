const faker = require('faker');

(async () => {
  // Generate credentials using faker
  const credential = {
    userName: faker.internet.userName(),
    password: faker.internet.password(),
  };

  // Log the generated credentials to the console
  console.log('Generated Username:', credential.userName);
  console.log('Generated Password:', credential.password);
})();
