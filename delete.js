const http = require('http');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getListas() {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': '11111'
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request("http://192.168.201.9/api/v1/discadora/getListas", options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          const listas = JSON.parse(data);
          const listasActive = listas.filter(lista => lista.ativa !== 'f');
          resolve(listasActive);
        } else {
          reject(new Error(`Failed to fetch data. Status code: ${response.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

function desativeLista(idLista) {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': '11111',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  };

  const data = new URLSearchParams();
  data.append('id_lista', idLista);
  data.append('ativa', 'false');

  return new Promise((resolve, reject) => {
    const req = http.request("http://192.168.201.9/api/v1/discadora/ativarLista", options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          const lista = JSON.parse(data);
          console.log("Result ==>>>", lista.Result)
          resolve();
        } else {
          reject(new Error(`Failed to desactivate the list. Status code: ${response.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data.toString());
    req.end();
  });
}

async function execute() {
  try {
    console.log("--------------- INIT")
    const listas = await getListas();

    for (const lista of listas) {
      console.log("init drop lista", lista.id_lista)
      await desativeLista(lista.id_lista);
      console.log("final drop lista", lista.id_lista)
      await sleep(1000);
    }

    console.log("--------------- FINAL")
  } catch (error) {
    console.error(error);
  }
}

execute();
