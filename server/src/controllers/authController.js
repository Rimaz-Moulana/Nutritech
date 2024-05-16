const authService = require('../services/authService');

async function register(req, res) {
   
    const { username, email, password, role } = req.body;

    try {
        console.log(req.body)
        await authService.registerUser(username, email, password, role);
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


async function login(req, res) {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        const user = await authService.getUserByEmail(email); // You need to implement this function in authService

        // Determine the dashboard route based on user role
        let dashboardRoute;
        switch (user.role) {
            case 'admin':
                dashboardRoute = '/users';
                break;
            case 'annotator':
                dashboardRoute = '/home';
                break;
            case 'sensor manager':
                dashboardRoute = '/sensormanagerhome';
                break;
            case 'researcher':
                dashboardRoute = '/researcherhome';
                break;
            case 'industry':
                dashboardRoute = '/industryhome';
                break;
            case 'expert panel':
                dashboardRoute = '/expertpanelhome'
                break;
            case 'head':
                dashboardRoute = '/headhome'
                break;
            case 'expert head':
                dashboardRoute = '/expertpanelhome';
                break;
                // dashboardRoute = '/expertpanelhome';
                // break;

            default:
                dashboardRoute = '/'; // Default route
                break;
        }

        res.status(200).json({ token, redirect: dashboardRoute });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = { login };


module.exports = { register, login };
