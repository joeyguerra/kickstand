const fs = require("fs")
const path = require("path")
const mkdirp = require("mkdirp")

const File = {
    async read(f){
        return new Promise((resolve, reject)=>{
            fs.readFile(f, {encoding: "utf-8"}, (err, data)=>{
                if(err) {
                    console.trace(err)
                    return reject(err)
                }
                resolve({file: f, data: data})
            })
        })
    },
    async unlink(filePath){
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, err => {
                if(err) reject(err)
                resolve()
            })
        })
    },
    async write(f, data){
        return new Promise((resolve, reject)=>{
            let rootFolder = f.split(path.sep)
            rootFolder.pop()
            rootFolder = rootFolder.join(path.sep)
            mkdirp(rootFolder, (err, createdFolder) => {
                if (err){
                    return reject(err)
                }
                fs.writeFile(f, data, err => {
                    if(err) {
                        return reject(err)
                    }
                    resolve({file: f, data: data})
                })
            })
        })
    },
    async stat(f){
        return new Promise((resolve, reject)=>{
            fs.stat(f, (err, stat)=>{
                if(err) return reject(err)
                resolve(stat)
            })
        })
    }
}
const readdir = async (folder)=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(folder, (err, files) => {
            if(err) return reject(err)
            resolve(files)
        })
    })
}

const Folder = {
    async read(folder){
        let files = await readdir(folder)
        let justFiles = []
        let upper = files.length
        for(let i = 0; i < upper; i++){
            let f = path.join(folder, files[i])
            let stat = await File.stat(f)
            if(stat.isDirectory()){
                justFiles = justFiles.concat(await Folder.read(f))
            } else {
                justFiles.push(f)
            }
        }
        return justFiles
    },
    async create(folder){
        return new Promise((resolve, reject)=>{
            fs.mkdir(folder, (err)=>{
                if(err) return reject(err)
                resolve(folder)
            })
        })
    }
}

module.exports = {
    File: File,
    Folder: Folder
}