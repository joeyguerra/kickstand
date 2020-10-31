import {File, Folder} from "./Dir.mjs"
import Handlebars from "handlebars"
import path from "path"
import Template from "./Template.mjs"
const SiteGenerator = {
    registerPartial(key, data){
        Handlebars.registerPartial(key, data)
    },
    renderPageObject(pathName, text){
        return {
            template: Template.get(path.extname(pathName), text),
            data: text,
            file: Template.transformToHtml(pathName)
        }
    },
    async run(pagesFolder, layoutsFolder){
        let layouts = await Folder.read(layoutsFolder)
        for(let i = 0; i < layouts.length; i++){
            let layoutFileName = layouts[i]
            let file = await File.read(layoutFileName)
            SiteGenerator.registerPartial(layoutFileName.split(path.sep).pop(), file.data)
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
export default SiteGenerator