// web server framework
import express from "express" 

// Cross-Origin Resource Sharing
import cors from "cors" 

// File System read write db.json
import fs from "fs"

const app = express()
const PORT = process.env.PORT || 3000 //Use Render’s port if available, otherwise 3000

// middleware
app.use(cors()) // It’s OK for other websites to call this server
app.use(express.json()) // enables req.body (ex: req.body = { title: "Hello" })

const DB_PATH = "./db.json"

function readDB() {
    // will use readFile later, cause lazy to write await function (❁´◡`❁)
    // basically this mean wait until it finishes reading (same as writeFileSync)
    // everything else will be block (if 100 user access this, backend will freeze:v)
    // else the db will receive unfinished data from the db.json (if the data is too large in the future)
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
}

function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// req = request | res = response
// READ
app.get("/posts", (req, res) => {
    const db = readDB()
    res.json(db.posts) // this will response to the website that calls this api
})

// CREATE
app.post("/posts", (req, res) => {
    const db = readDB()
    const newPost = {
        id: Date.now(),
        title: req.body.title
    }
    db.posts.push(newPost)
    writeDB(db)
    res.json(newPost)
})

// UPDATE
app.put("/posts/:id", (req, res) => {
    const db = readDB()
    const id = req.params.id
    const newTitle = req.body.title

    const post = db.posts.find(p => p.id == id)

    if (!post) {
        return res.status(404).json({ error: "Post not found" })
    }

    post.title = newTitle
    writeDB(db)

    res.json(post)
})

// DELETE
app.delete("/posts/:id", (req, res) => {
    const db = readDB()
    db.posts = db.posts.filter(p => p.id != req.params.id)
    writeDB(db)
    res.json({ success: true })
})

app.listen(PORT, () => {
    console.log("Server running on port", PORT)
})

// Later use this instead:

// async function readDB() {
//     const data = await fs.readFile(DB_PATH, "utf-8")
//     return JSON.parse(data)
// }

// async function writeDB(data) {
//     await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
// }

// app.get("/posts", async (req, res) => {
//     const db = await readDB()
//     res.json(db.posts)
// })