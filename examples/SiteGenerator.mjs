import SiteGenerator from "../lib/SiteGenerator.mjs"
import path from "path"
import { File } from "../lib/Dir.mjs"
import assert from "assert"

const root = path.dirname((new URL(import.meta.url)).pathname)
const TEMPALTES_PAGES = path.join(root, "templates/pages")
const TEMPALTES_LAYOUTS = path.join(root, "templates/layouts")

describe("Given layouts and pages folders, when they contain markdown files with meta data", ()=>{
    it("then the files are transformed into HTML with the meta data", async () => {
        let f = await File.read(`${TEMPALTES_LAYOUTS}/blog.html`)
        SiteGenerator.registerPartial("blog.html", f.data)
        let markdownFile = await File.read(`${TEMPALTES_PAGES}/markdown-with-layout.md`)
        let obj = SiteGenerator.renderPageObject(`${TEMPALTES_PAGES}/markdown-with-layout.md`, markdownFile.data)
        let html = obj.template({})
        assert.ok(html.indexOf("<h1>Test Document</h1>") > -1)
    })
})