const express = require("express")
const users = require("./users-model")
const { checkUserID, checkUserData } = require('../middleware/user')
const { orWhereNotExists } = require("../data/config")
const router = express.Router()

router.get("/users", (req, res) => {
	const options = {
		sortBy: req.query.sortBy,
		limit: req.query.limit,
	}

	users.find(options)
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {

			// calling next with a parameter moves to the error middleware
			// at the end of the middleware stack

			next(error)

			//remove below code and replace with the error handler
			// console.log(error)
			// res.status(500).json({
			// 	message: "Error retrieving the users",
			// })
		})
})

router.get("/users/:id", checkUserID(), (req, res) => {

	// you can now take out anything that was put into the middleware function
	  
	// users.findById(req.params.id)
	// 	.then((user) => {
	// 		if (user) {     // now users is not defined, so we need to access it
							// look to middleware User to see => req.user = user
				res.status(200).json(req.user)
		// 	} else {
		// 		res.status(404).json({
		// 			message: "User not found",
		// 		})
		// 	}
		// })
		// .catch((error) => {
		// 	console.log(error)
		// 	res.status(500).json({
		// 		message: "Error retrieving the user",
		// 	})
		// })
})

router.post("/users", checkUserData(), (req, res) => {
	// you can now remove the function that was moved to middleware
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.add(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
})

router.put("/users/:id", checkUserData(), checkUserID(), (req, res) => {
	// you can now remove the function that was moved to middleware
	// if (!req.body.name || !req.body.email) {
	// 	return res.status(400).json({
	// 		message: "Missing user name or email",
	// 	})
	// }

	users.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user)
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.delete("/users/:id", checkUserID(), (req, res) => {
	users.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/users/:id/posts", checkUserID(), (req, res) => {
	users.findUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
})

router.get("/users/:id/posts/:postId", checkUserID(), (req, res) => {
	users.findUserPostById(req.params.id, req.params.postId)
		.then((post) => {
			if (post) {
				res.json(post)
			} else {
				res.status(404).json({
					message: "Post was not found",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
})

router.post("/users/:id/posts", checkUserID(), (req, res) => {
	if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	users.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)

			// an way to write this even shorter
			//  .catch(next)
		})
})

module.exports = router