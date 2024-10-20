const isAuth = (req, res, next ) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

const isAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    return next()
  }
  res.render('not-authorized', {
    title: "not authorized",
    message: "Sorry, you are not authorized to view this content, you must be an Admin",
  })
}

const isMember = (req, res, next) => {
  if(req.user.role === "members") {
      return next();
  }
  res.render("not-authorized", {
      title: "Not authorized",
      message: "Sorry, you are not authorized to view this content, you must be a Member",
  })
}

const isMemberOrAdmin = (req, res, next) => {
  if(req.user.role === "members" || req.user.role === "admin") {
      return next();
  }
  res.render("not-authorized", {
      title: "Not authorized",
      message: "Sorry, you are not authorized to view this content",
  })
}

module.exports = {
  isAuth,
  isAdmin,
  isMember,
  isMemberOrAdmin
}