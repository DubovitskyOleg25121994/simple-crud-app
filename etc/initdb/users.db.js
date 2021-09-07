db.createUser({
    user: "user",
    pwd: "secret",
    roles: [{
      role: "readWrite",
      db: "simple-crud-app"
    }]
  });

  const users = [{
    email: 'test2@test.ru',
    name: 'Ivan',
  }];
  
  users.forEach(user => {
    const {
      email,
      name,
    } = user;
    db.users.insert({
      email,
      name,
    })
  })