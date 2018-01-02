const Handlebars = require("handlebars")
const assert = require("assert")
const Dir = require("../lib/Dir")
const Path = require("path")
const root = __dirname
const layouts = Path.join(root, "templates/layouts")
describe("should render in layout", ()=>{
    it("render layout", async ()=>{
        let files = await Dir.Folder.read(layouts)
        for(let i = 0; i < files.length; i++){
            let f = files[i]
            let file = await Dir.File.read(f)
            Handlebars.registerPartial(f.split(Path.sep).pop(), file.data)
        }
        let pages = await Dir.Folder.read(Path.join(root, "/templates/pages"))
        let templates = []
        for(let i = 0; i < pages.length; i++){
            let file = await Dir.File.read(pages[i])
            templates.push({
                template: Handlebars.compile(file.data),
                data: file.data,
                file: file.file
            })
        }
        let built = templates.map(t=> {
            return t.template({})
        })
        assert.ok(built.length > 0)
        assert.ok(built.join("\n").indexOf("<!doctype") > -1)
    })
})