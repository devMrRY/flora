const fms = require("fms-api-client");
const { connect } = require("marpat");

connect("nedb://memory")
  .then((db) => {
    const client = fms.Filemaker.create({
      name: "flora",
      database: "database name",
      concurrency: 3,
      server: "server",
      user: "user",
      password: "password",
      usage: true,
    });
    return client.save();
  })
  .then((client) => {
    // ((client) =>
    //   Promise.all([
    //     client.create("Heroes", { name: "Anakin Skywalker" }, { merge: true }),
    //     // client.create("Heroes", { name: "Obi-Wan" }, { merge: true }),
    //     // client.create("Heroes", { name: "Yoda" }, { merge: true }),
    //   ])
    //     .then((result) => log("create-many-records-example", result))
    //     .catch((err) => console.log(err)))(client);
    // client
    //   .login()
    //   .then((conn) => console.log(conn))
    //   .catch((error) => console.log(error));
    client.productInfo().then(result=>{console.log(result)}).catch(err=>console.log(err))
    client.databases().then(result=>{console.log(result)}).catch(err=>console.log(err))
    client.status().then(result=>{console.log(result)}).catch(err=>console.log(err))
    client.layouts().then(result=>{console.log(result)}).catch(err=>console.log(err))
  });
