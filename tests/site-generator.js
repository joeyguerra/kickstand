const SiteGenerator = require("../lib/SiteGenerator.js")
const Path = require("path")
const {File, Folder} = require("../lib/Dir")
const TEMPALTES_PAGES = Path.join(__dirname, "templates/pages")
const TEMPALTES_LAYOUTS = Path.join(__dirname, "templates/layouts")
const Assert = require("assert")


describe("Test Site Generator API", ()=>{

    it("Should return an object", async ()=> {
        let f = await File.read(`${TEMPALTES_LAYOUTS}/blog.html`)
        SiteGenerator.registerPartial("blog", f.data)
        let markdownFile = await File.read(`${TEMPALTES_PAGES}/markdown-with-layout.md`)
        let obj = SiteGenerator.renderPageObject(`${TEMPALTES_PAGES}/markdown-with-layout.md`, markdownFile.data)
        let html = obj.template({})
        Assert.ok(html.indexOf("<h1>This is a new blog post</h1>") > -1)
    })
})