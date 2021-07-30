const express = require("express")
const app = express()

const { sequelize, User, Post } = require("./models")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post("/users", async (req, res) => {
  const { name, email, role } = req.body

  try {
    const user = await User.create({ name, email, role })
    return res.status(200).json({ success: true, data: user })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, data: err })
  }
})

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll()
    return res.status(200).json({ success: true, data: users })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, data: err })
  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ where: { uuid: req.params.id }, include: 'posts' })
    return res.status(200).json({ success: true, data: user })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, data: err })
  }
})

app.post("/posts", async (req, res) => {
  try {
    const { userUuid, body } = req.body
    const user = await User.findOne({ where: { uuid: userUuid } })

    const post = await Post.create({ body, userId: user.id })
    return res.status(200).json({ success: true, data: post })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, data: err })
  }
})

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ['user']})
    return res.status(200).json({ success: true, data: posts })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, data: err })
  }
})

app.listen(5000, async () => {
  console.log("server running on http://localhost:5000")
  await sequelize.authenticate()
  console.log("database connected")
})
