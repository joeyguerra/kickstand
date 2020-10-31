import SiteGenerator from "../lib/SiteGenerator.mjs"
import path from "path"
import { File } from "../lib/Dir.mjs"

const TEMPALTES_PAGES = path.join(__dirname, "templates/pages")
const TEMPALTES_LAYOUTS = path.join(__dirname, "templates/layouts")
const assert = require("assert")

describe("Test Site Generator API", ()=>{
    it("Should support meta data in markdown templates for contextual information used in the application.", async ()=> {
        let f = await File.read(`${TEMPALTES_LAYOUTS}/blog.html`)
        SiteGenerator.registerPartial("blog.html", f.data)
        let markdownFile = await File.read(`${TEMPALTES_PAGES}/markdown-with-layout.md`)
        let obj = SiteGenerator.renderPageObject(`${TEMPALTES_PAGES}/markdown-with-layout.md`, markdownFile.data)
        let html = obj.template({})
        assert.ok(html.indexOf("<h1>Test Document</h1>") > -1)
    })
})