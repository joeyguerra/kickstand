import { Folder } from "../lib/Dir.mjs"
import path from "path"
import assert from "assert"

const root = path.dirname((new URL(import.meta.url)).pathname)
const TEMPALTES_PAGES = path.join(root, "templates/pages")

describe("Given a folder path, when reading it", ()=>{
    it("then reads all the files in that folder", async ()=> {
        let files = await Folder.read(TEMPALTES_PAGES)
        assert.strictEqual(files[0], path.join(TEMPALTES_PAGES, "/index.html"))
    })
})