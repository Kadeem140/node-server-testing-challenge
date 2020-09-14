const express = require("express")
const Users = require("./users-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        res.json(await Users.find())
    } catch(err){
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const user = await Users.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.json(user)
    } catch(err){
        next(err)
    }
})

router.post("/", async (req,res, next) => {
	try{
		const user = await Users.create(req.body)
		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})

router.put("/:id", async (req,res, next) => {
	try{
        const user = await Users.update(req.body)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})

router.delete("/:id", async (req, res, next) => {
    try{
		const user = await Users.remove(req.params.id)
        
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(204).end()
	} catch(err) {
		next(err)
	}
})


module.exports = router