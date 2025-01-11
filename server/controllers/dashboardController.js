const Note = require("../models/Notes");
const mongoose = require("mongoose");

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res, next) => {
  let perPage = 6;  // Number of notes per page
  let page = parseInt(req.query.page, 10) || 1;  // Current page number

  const locals = {
      title: 'Dashboard',
      description: 'Free NodeJs Notes App Dashboard',
  };

  try {
      // Fetch notes with sorting by pinned status and updatedAt timestamp
      const notes = await Note.aggregate([
          { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
          { $sort: { pinned: -1, updatedAt: -1 } },  // Sort by pinned status and updatedAt descending
          {
              $project: {
                  title: { $substr: ["$title", 0, 30] },
                  body: { $substr: ["$body", 0, 100] },
                  pinned: 1
              },
          }
      ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

      // Count total number of notes
      const count = await Note.countDocuments({ user: new mongoose.Types.ObjectId(req.user.id) });

      res.render('dashboard/index', {
          userName: req.user.firstName,
          locals,
          notes,
          layout: '../views/layouts/dashboard',
          current: page,
          pages: Math.ceil(count / perPage)
      });
  } catch (error) {
      console.error("Error fetching notes:", error);
      next(error);
  }
};
/**
 * POST /
 * Toggle Pin Status of a Note
 */
exports.dashboardTogglePin = async (req, res) => {
  try {
    // Find the note and toggle its pinned status
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (note) {
      note.pinned = !note.pinned;
      note.updatedAt = Date.now(); // Update the updatedAt timestamp
      await note.save();
      res.redirect('/dashboard');  // Redirect back to the dashboard
    } else {
      res.status(404).send('Note not found');
    }
  } catch (error) {
    console.error("Error toggling pin status:", error);
    res.status(500).send('An error occurred while updating the note. Please try again.');
  }
};

/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
    const note = await Note.findById({ _id: req.params.id })
      .where({ user: req.user.id })
      .lean();
  
    if (note) {
      res.render("dashboard/view-notes", {
        noteID: req.params.id,
        note,
        layout: "../views/layouts/dashboard",
      });
    } else {
      res.send("Something went wrong.");
    }
};
/**
 * PUT /
 * Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
/**
 * DELETE /
 * Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};
/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while adding the note. Please try again.');
  }
};
/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};

/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};




