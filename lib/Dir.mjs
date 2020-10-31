import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"

const File = {
    async read(f){
        return await fs.promises.readFile(f, {encoding: "utf-8"})
    },
    async unlink(filePath){
        return await fs.promises.unlink(filePath)
    },
    async write(f, data){
        let rootFolder = f.split(path.sep)
        rootFolder.pop()
        rootFolder = rootFolder.join(path.sep)
        console.log("rootFolder", rootFolder)
        await mkdirp(rootFolder)
        await fs.promises.writeFile(f, data)
    },
    async stat(f){
        return await fs.promises.stat(f)
    }
}
const readdir = async (folder)=>{
    return await fs.promises.readdir(folder)
}
const rmdir = async folder => {
    return await fs.promises.rmdir(folder)
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
    async delete(folderPathName){
        let files = await this.read(folderPathName)
        let upper = files.length
        for(let i = 0; i < upper; i++){
            await File.unlink(files[i])
        }
        let folders = await readdir(folderPathName)
        let foldersMax = folders.length
        for(let i = 0; i < foldersMax; i++){
            try{
                await rmdir(`${folderPathName}/${folders[i]}`)
            }catch(e){console.log(e)}
        }
    },
    async create(folder){
        return await fs.promises.mkdir(folder)
    }
}

export default Folder
export {
    File,
    Folder
}