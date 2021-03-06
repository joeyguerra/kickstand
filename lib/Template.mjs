import Handlebars from "handlebars"
import MarkdownIt from "markdown-it"
import Meta from "markdown-it-meta"
export default {
    get(extension, data){
        let md = new MarkdownIt({
            html: true,
            linkify: true
        })
        md.use(Meta)
        if(extension.indexOf("md") == -1) return Handlebars.compile(data)
        return (context)=>{
            let output = md.render(data)
            if(md.meta.layout){
                output = `{{#> ${md.meta.layout}}}\n${output}{{/${md.meta.layout}}}`
                context.meta = Object.assign(md.meta, context.meta)
            }
            let template = Handlebars.compile(output)
            return template(context)
        }
    },
    transformToHtml(fileName){
        return fileName.replace("md", "html")
    }
}