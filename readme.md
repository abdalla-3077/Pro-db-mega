<div  align="center">
<p>
<img style="margin-bottom:-6px" src="https://i.ibb.co/gttdg4C/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f393135393539393731.png"/>
<a href="https://www.npmjs.com/package/pro.db-mega/" alt="pro.db-fork" /></a>
</p>
</p>
</div>

## What is pro.db-mega ?
- It is a easy and quick storage unit that relies on `objects` to store data in **JSON** format
- BTW THIS IS A FORK ( NOT REAL VERSION ) check it out here [https://www.npmjs.com/package/pro.db/]
- Encrypt-Decrypt data set with SecretKey you can generate SecretKey from [https://generate-random.org/api-token-generator?count=1&length=64&type=mixed-numbers-symbols]


## Installation
- You need to install the package on your project
```sh-session
npm install pro.db-mega
yarn add pro.db-mega
```
## Important Alert ⚠

- The primary secret key is not secure. It is preferable to choose your own secret key

## How To Use
```js
const {DB} = require('pro.db-mega');

const db = new DB({fileName: `database.json`})

await db.set('key','value');// to set a data to database.
await db.get('key');// to get the data by key.
await db.delete('key');// to delete key from database.
await db.has('key','value');// return "true" or "false".

await db.setEncrypted('key','value','code');// to set a data to database. but its Encrypted 
await db.setEncrypted('key','code');// to get the Encrypted data by key.


await db.add('key', 10;);// to add a number to the key.
await db.substract('key', 5);// to subtract a number from the key.
await db.push('key', 10);// to set a data at the end.
await db.math("key","+",5);// to math the numbers.

await db.fetch(); // to fetch the data from database. 
await db.fetchAll();// to fetchAll data.
await db.all();// to get all data in database.

await db.backup("Filename");// to make a backup file.
await db.reset();// to delete all data and database.

await connect("mongoose URL") //Connect mongoose db 
await addMon('key','value')// to set a data to mongoose database.
await getMon('key')// to get the data by key from mongoose db.
await deleteOneMon('key')// to delete key from mongoose database.
await deleteAllMon() // to delete all data and mongoose database.

generateSecretKey() //Gives you a new random secret key



```
## Contact

- Contact With Me Discord : [`.__.abdalla`](https://www.npmjs.com/package/pro.db-mega)
