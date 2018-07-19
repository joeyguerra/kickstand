const express = require("express")
const app = express()
const server = require("http")
const port = process.env.PORT || 3000
const Path = require("path")
const root = __dirname
const layoutsFolder = Path.join(root, "/templates/layouts")
const pagesFolder = Path.join(root, "/templates/pages")
const {SiteGenerator, File, Folder} = require("./index")

Promise.all([Folder.create("templates"),
    Folder.create("templates/layouts"),
    Folder.create("templates/pages"),
    Folder.create("public")]
).then(v=>{
    console.log("Folders created")
}).catch(e => {
    console.error(e)
})

server.createServer(app).listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})

app.use(express.static("public"))
SiteGenerator.run(pagesFolder, layoutsFolder)
    .then(async files => {
        for(let i = 0; i < files.length; i++){
            let t = files[i]
            let newFilePath = t.file.replace(pagesFolder, "")
            try{
                let b = await File.write(Path.join(root, "/public/", newFilePath), t.template({}))
            } catch(e){
                console.error(e)
            }
        }
    })