import { MongoClient } from "mongodb";
import { rejects } from "node:assert";
import { resolve } from "node:path";

let arrayObjeto = [{ a: 1 }, { a: 2 }, { a: 3 }];

const job = async () => {
  let p: Promise<Object> = new Promise((resolve, rejects) => {
    MongoClient.connect(
      "mongodb://root:example@localhost",
      async function (err, client) {
        if (!err) {
          console.log("Connected successfully to server");
          client
            .db("myproject")
            .collection("documents")
            .insertMany(arrayObjeto)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              rejects(error);
            });
          client.close();
        } else {
          console.log(err.message);
        }
      }
    );
  });

  await p
    .then((resultado) => {
      console.log(JSON.stringify(resultado));
    })
    .catch((erro) => {
      console.log(erro);
    });
  console.log("Fim");
};

job();
