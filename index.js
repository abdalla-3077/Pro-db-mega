const fs = require('fs')
let fileName
const Cryptr = require('cryptr');
const mongoose = require('mongoose');
const { bold } = require('chalk');

const MyModel = mongoose.model('pro-db-plus', {
    data: String,
    value: String,
    createdAt: Date,
  });

class Data {
    /**
     * 
     * @param {Object} options 
     * @param {string} options.fileName
     */
    constructor(options = { fileName }) {
        if (options.fileName) fileName = options.fileName || `database.json`
        this.fileName = options.fileName || `database.json`
    }



    setEncrypted(data, UnEncryptedValue, code) {
        let SecretKey
        if (!code) {
            SecretKey = "pMzzkg1T3mlTj2k=VeyLZYQrq9V2rcvXBaJwmDXe-XvO6h5sUraP=RnxdMb3wcYA"
            console.warn("[Pro Db Plus] - Your secret key is the default one, and it's not safe.")
        } else {
            SecretKey = code
        }
        const cryptr = new Cryptr(SecretKey);
        const value = cryptr.encrypt(UnEncryptedValue);

        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);

            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] = value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] = value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        }
    }

    getEncrypted(data, code) {
        const secretKey = code || "pMzzkg1T3mlTj2k=VeyLZYQrq9V2rcvXBaJwmDXe-XvO6h5sUraP=RnxdMb3wcYA";
        const cryptr = new Cryptr(secretKey);

        if (!fs.existsSync(this.fileName)) {
            fs.writeFileSync(this.fileName, '{}');
        }

        if (!data) return false;

        const file = JSON.parse(fs.readFileSync(this.fileName, 'utf8'));
        const encryptedData = file[data];

        if (!encryptedData) return false;

        try {
            const decryptedValue = cryptr.decrypt(encryptedData);
            return decryptedValue;
        } catch (error) {
            console.error("[Pro Db Plus] - \n", error);
            return null;
        }
    }


    set(data, value) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);

            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] = value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] = value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        }
    }

    fetch(data) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);

            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data]
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data]
        }
    }
    has(data) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data] ? true : false
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data] ? true : false
        }
    }
    fetchAll() {
        const fetchall = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
        return fetchall
    }
    delete(data) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            if (!file[data]) throw new TypeError('Theres no data to add to database! \n' + __dirname)
            delete file[data]
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            if (!file[data]) throw new TypeError('Theres no data to add to database! \n' + __dirname)
            delete file[data]
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        }
    }
    backup(fileName) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            if (!fileName) throw new TypeError(`Filename not defined!`)
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return fs.writeFileSync(`${this.fileName}.json`, JSON.stringify(file, null, 1))
        } else {
            if (!fileName) throw new TypeError(`Filename not defined!`)
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return fs.writeFileSync(`${this.fileName}.json`, JSON.stringify(file, null, 1))
        }
    }
    add(data, value) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            if (!data) return false;
            if (isNaN(value)) throw new TypeError(`The value must be a number!`)
            if (!this.has(data)) {
                this.set(data, 0)
            }

            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] += value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        } else {
            if (!data) return false;
            if (isNaN(value)) throw new TypeError(`The value must be a number!`)
            if (!this.has(data)) {
                this.set(data, 0)
            }
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] += value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))

        }
    }
    subtract(data, value) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            if (!data) return false;
            if (typeof value !== `number`) throw new TypeError(`The value must be a number!`)
            if (!this.has(data)) throw new TypeError(`The data is not defined!`)
            if (typeof this.fetch(data) !== `number`) throw new TypeError(`The value must be number!`)
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] -= value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        } else {
            if (!data) return false;
            if (typeof value !== `number`) throw new TypeError(`The value must be a number!`)
            if (!this.has(data)) throw new TypeError(`The data is not defined!`)
            if (typeof this.fetch(data) !== `number`) throw new TypeError(`The value must be number!`)
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            file[data] -= value
            return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
        }
    }
    reset() {
        const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
        return fs.writeFileSync(`${this.fileName}`, JSON.stringify({}, null, 1))
    }
    all(sınır = 0) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            const object = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`));

            var result = [];
            for (var i in object)
                result.push([`DATA = ${i}`, `VALUE = ${object[i]}`]);
            return result
        } else {
            const object = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`));

            var result = [];
            for (var i in object)
                result.push([`DATA = ${i}`, `VALUE = ${object[i]}`]);
            return result
        }
    }
    push(key, value) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            const veri = this.fetch(key);
            if (!veri) {

                return this.set(key, [value]);
            }
            if (Array.isArray(veri)) {
                veri.push(value);
                return this.set(key, veri);
            } else {

                return this.set(key, [value]);
            }
        } else {
            const veri = this.fetch(key);
            if (!veri) {

                return this.set(key, [value]);
            }
            if (Array.isArray(veri)) {
                veri.push(value);
                return this.set(key, veri);
            } else {

                return this.set(key, [value]);
            }
        }
    }
    math(data, limit, value) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            if (!data) throw new TypeError(`Theres no data founded!`)
            if (!limit) throw new TypeError(`The process not defined!`)
            if (!value) throw new TypeError(`Theres no value entered!`)
            if (!file[data]) throw new TypeError('couldnt get the data!')
            if (isNaN(value)) throw new TypeError(`The value must be number!`)
            if (isNaN(this.fetch(data))) throw new TypeError(`The value must be number!`)
            switch (limit) {
                case `+`:
                    file[data] += value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `-`:
                    file[data] -= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `*`:
                    file[data] *= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `/`:
                    file[data] /= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `%`:
                    file[data] %= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                default:
                    return undefined
                    break;
            }
        } else {
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            if (!data) throw new TypeError(`Theres no data founded!`)
            if (!limit) throw new TypeError(`The process not defined!`)
            if (!value) throw new TypeError(`Theres no value entered!`)
            if (!file[data]) throw new TypeError('couldnt get the data!')
            if (isNaN(value)) throw new TypeError(`The value must be number!`)
            if (isNaN(this.fetch(data))) throw new TypeError(`The data must be number!`)
            switch (limit) {
                case `+`:
                    file[data] += value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `-`:
                    file[data] -= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `*`:
                    file[data] *= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `/`:
                    file[data] /= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                case `%`:
                    file[data] %= value
                    return fs.writeFileSync(`${this.fileName}`, JSON.stringify(file, null, 1))
                    break;
                default:
                    return undefined
                    break;
            }
        }


    }

    get(data) {
        if (!fs.existsSync(`${this.fileName}`)) {
            fs.writeFileSync(`${this.fileName}`, `{}`);

            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data]
        } else {
            if (!data) return false;
            const file = JSON.parse(fs.readFileSync(`${this.fileName}`, `utf8`))
            return file[data]
        }
    }


     generateSecretKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const tokenLength = 64;
        let token = '';
      
        for (let i = 0; i < tokenLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          token += characters.charAt(randomIndex);
        }
      
        return token;
      }

       connect(db, options = []) {
        if (!db) throw new Error('[Pro Db Plus] -  Database URL was not provided');
        mongoose.set('strictQuery', true);
      
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    
        if (options.notify === false) return;
        else return  console.log(bold.blue('[ Xp Database  Conected ]'));
        
    }

    async  addMon(data, value) {
        try {
          const newData = {
            data: data,
            value:value ,
            createdAt: new Date(),
          };

          const document = new MyModel(newData);
          await document.save(); 
      
          return  true;
        } catch (error) {
          console.error('Error saving data:', error);
           return  false; 
        }
      }

      async  getMon(data) {
        try {
          const result = await MyModel.findOne({ data: data });
          return result ? result : "No Data";
        } catch (error) {
          console.error("Database error:", error);
          throw error; 
        }
      }

      async  deleteOneMon(data) {
        try {
          const result = await MyModel.deleteOne({ data: data });
          return result ? result : "err";
        } catch (error) {
          console.error("Database error:", error);
          throw error; 
        }
      }

      async  deleteAllMon() {
        try {
          const result = await MyModel.deleteMany();
          return result ? result : "err";
        } catch (error) {
          console.error("Database error:", error);
          throw error; 
        }
      }
      
}
module.exports.DB = Data
