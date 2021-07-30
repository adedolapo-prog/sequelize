const express = require("express")
const app = express()

const { sequelize, User } = require("./models")
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

app.listen(5000, async () => {
  console.log("server running on http://localhost:5000")
  await sequelize.authenticate()
  console.log("database connected")
})
