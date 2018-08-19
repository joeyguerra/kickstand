const {File, Folder} = require("./Dir")
const Handlebars = require("handlebars")
const Path = require("path")
const Template = require("./Template")
const SiteGenerator = {
    registerPartial(key, data){
        Handlebars.registerPartial(key, data)
    },
    renderPageObject(pathName, text){
        return {
            template: Template.get(Path.extname(pathName), text),
            data: text,
            file: Template.transformToHtml(pathName)
        }
    },
    async run(pagesFolder, layoutsFolder){
        let layouts = await Folder.read(layoutsFolder)
        for(let i = 0; i < layouts.length; i++){
            let layoutFileName = layouts[i]
            let file = await File.read(layoutFileName)
            SiteGenerator.registerPartial(layoutFileName.split(Path.sep).pop(), file.data)
        }
        let pages = await Folder.read(pagesFolder)
        let files = []
        for(let i = 0; i < pages.length; i++){
            try{
                let p = pages[i]
                let file = await File.read(p)
                let obj = SiteGenerator.renderPageObject(p, file.data)
                files.push( obj )
            }catch(e){console.error(e)}
        }
        return files
    }
}
module.exports = SiteGenerator