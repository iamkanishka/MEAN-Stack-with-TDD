// Importing Routes
const UserRoutes = require('./user.routes')


/**
 * retruns the subRoutes
 * @param {app} app the expressApp
 * @returns return the SubRoutes 
 */
exports.routerConfig = async (app) => {
  await  UserRoutes.userRoutes(app)

}