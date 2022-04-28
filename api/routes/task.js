const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// CREATE A NEW TASK
router.post("/create", body("title").isLength({ min: 2 }), async (req, res) => {
  const errors = validationResult(req);
  const { title, userId } = req.body;

  const task = new Task({
    title,
    userId,
  });

  try {
    // Check if task's length is over 2'
    if (!errors.isEmpty() && errors.errors[0].param === "title") {
      return res
        .status(400)
        .json({ message: "Task must be at least 2 characters." });
    }

    // Saving the user in db
    const newTask = await task.save();
    res.status(201).json({
      message: "Task successfully created",
      ...newTask._doc,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred and the user could not be created",
      error: error.message,
    });
  }
});

// UPDATE TASK INFORMATION
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Making sure that the user is allowed to only update his/her tasks
    if (task.userId === req.body.userId) {
      await task.updateOne({ $set: req.body });
      res.status(201).json({
        message: "Task successfully updated",
        ...task._doc,
      });
    } else {
      res.status(403).json({
        message: "You are only allowed to modify your tasks",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred and the task could not be updated",
      error: error.message,
    });
  }
});

// UPDATE IS COMPLETE VALUE
router.patch("/:id/complete", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Making sure that the user is allowed to only update his/her tasks
    if (task.userId === req.body.userId) {
      await task.updateOne({ $set: { isCompleted: !task.isCompleted } });
      res.status(201).json({
        message: "isCompleted value is updated!",
      });
    } else {
      res.status(403).json({
        message: "You are only allowed to modify your tasks",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred and the task could not be updated",
      error: error.message,
    });
  }
});

// DELETE A Task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.userId === req.body.userId) {
      await task.deleteOne();
      res.status(201).json({
        message: "Task successfully deleted",
      });
    } else {
      res.status(403).json({
        message: "You are only allowed to delete your tasks",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete task!",
      error: error.message,
    });
  }
});

// GET A SPECIFIC TASK
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({
      message: "Task was successfully fetched!",
      ...task._doc,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot find the task!",
      error: error.message,
    });
  }
});

// GET ALL TASKS OF A SPECIFIC USER
router.get("/all/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userTasks = await Task.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      ...userTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot fetch the tasks!",
      error: error.message,
    });
  }
});

// DELETE ALL TASKS OF A SPECIFIC USER
router.delete("/deleteAll/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    await Task.deleteMany({ userId: currentUser._id });
    res.status(200).json({
      message: "All tasks are removed!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot remove the tasks!",
      error: error.message,
    });
  }
});

module.exports = router;
