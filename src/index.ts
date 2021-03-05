import { MongoClient } from "mongodb";
import { Retangulo } from "./class/usuario";

const retangulo = new Retangulo();
retangulo.altura = 1;
retangulo.largura = 2;
const retanguloArra = new Array();
retanguloArra.push(retangulo);

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
            .insertMany(retanguloArra)
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
