import Handlebars from "handlebars"
import assert from "assert"
import {File, Folder} from "../lib/Dir.mjs"
import path from "path"

const root = path.dirname((new URL(import.meta.url)).pathname)
const layouts = path.join(root, "templates/layouts")

describe("Given a layout and pages template folder, when reading the files", ()=>{
    it("then transform the files into HTML", async ()=>{
        let files = await Folder.read(layouts)
        for(let i = 0; i < files.length; i++){
            let f = files[i]
            let file = await File.read(f)
            Handlebars.registerPartial(f.split(path.sep).pop(), file.data)
        }
        let pages = await Folder.read(path.join(root, "/templates/pages"))
        let templates = []
        for(let i = 0; i < pages.length; i++){
            let file = await File.read(pages[i])
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
        assert.ok(built.join("\n").indexOf("<!DOCTYPE") > -1)
    })
})