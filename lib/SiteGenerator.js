const {File, Folder} = require("./Dir")
const Handlebars = require("handlebars")
const Path = require("path")
const Template = require("./Template")
const emitter = require("events")
const SiteGenerator = {
    async run(pagesFolder, layoutsFolder){
        let layouts = await Folder.read(layoutsFolder)
        for(let i = 0; i < layouts.length; i++){
            let layoutFileName = layouts[i]
            let file = await File.read(layoutFileName)
            Handlebars.registerPartial(layoutFileName.split(Path.sep).pop(), file.data)
        }
        let pages = await Folder.read(pagesFolder)
        let files = []
        for(let i = 0; i < pages.length; i++){
            try{
                let p = pages[i]
                let file = await File.read(p)
                let obj = {
                    template: Template.get(Path.extname(p), file.data),
                    data: file.data,
                    file: Template.transformToHtml(p)
                }
                files.push( obj )
                emitter.emit("pushed", obj)
            }catch(e){console.error(e)}
        }
        return files
    },
    on(name, listener){
        emitter.on(name, listener)
    },
    off(name, listener){
        emitter.off(name, listener)
    }
}
module.exports = SiteGenerator