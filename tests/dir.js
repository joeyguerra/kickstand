const {Folder} = require("../lib/Dir")
const Path = require("path")
const TEMPALTES_PAGES = Path.join(__dirname, "templates/pages")
const Assert = require("assert")


describe("given a folder", ()=>{

    it("Should read all the files in a folder", async ()=> {
        let files = await Folder.read(TEMPALTES_PAGES)
        Assert.equal(files[0], Path.join(TEMPALTES_PAGES, "/index.html"))
    })
})