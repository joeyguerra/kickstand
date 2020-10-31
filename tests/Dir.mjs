import {Folder} from "../lib/Dir.mjs"
import path from "path"
const TEMPALTES_PAGES = path.join(__dirname, "templates/pages")
const assert = require("assert")

describe("given a folder", ()=>{
    it("Should read all the files in a folder", async ()=> {
        let files = await Folder.read(TEMPALTES_PAGES)
        assert.strictEqual(files[0], path.join(TEMPALTES_PAGES, "/index.html"))
    })
})