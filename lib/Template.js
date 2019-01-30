const Handlebars = require("handlebars")
const MarkdownIt = require("markdown-it")
const Meta = require("markdown-it-meta")
module.exports = {
    get(extension, data){
        let md = new MarkdownIt({
            html: true,
            linkify: true
        })
        md.use(Meta)
        if(extension.indexOf("md") > -1){
            return (context)=>{
                let output = md.render(data)
                if(md.meta.layout){
                    output = `{{#> ${md.meta.layout}}}\n${output}{{/${md.meta.layout}}}`
                    context.meta = Object.assign(md.meta, context.meta)
                }
                let template = Handlebars.compile(output)
                return template(context)
            }
        }
        return Handlebars.compile(data)
    },
    transformToHtml(fileName){
        return fileName.replace("md", "html")
    }
}