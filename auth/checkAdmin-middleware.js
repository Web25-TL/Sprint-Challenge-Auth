module.exports = checkAdmin;


function checkAdmin(req, res, next) {
   if(req.decodedJwt.admin === true) {
       next();
   } else {
       res.status(401).json({ message: 'You are not authorized' });
   }
};