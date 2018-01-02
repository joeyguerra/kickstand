const {File, Folder} = require("./Dir")
const Handlebars = require("handlebars")
const Path = require("path")
const Template = require("./Template")
const Builder = {
    configure(pagesFolder, layoutsFolder){
        this.pagesFolder = pagesFolder
        this.layoutsFolder = layoutsFolder
        return this
    },
    async run(){
        let layouts = await Folder.read(this.layoutsFolder)
        for(let i = 0; i < layouts.length; i++){
            let layoutFileName = layouts[i]
            let file = await File.read(layoutFileName)
            Handlebars.registerPartial(layoutFileName.split(Path.sep).pop(), file.data)
        }
        let pages = await Folder.read(this.pagesFolder)
        let files = []
        for(let i = 0; i < pages.length; i++){
            try{
                let p = pages[i]
                let file = await File.read(p)
                files.push( {
                    template: Template.get(Path.extname(p), file.data),
                    data: file.data,
                    file: Template.transformToHtml(p)
                })
            }catch(e){console.error(e)}
        }
        return files
    }
}
module.exports = Builder