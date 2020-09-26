import { Router } from 'express';
import UserRouter from './Users';
import RepositoriesRouter from './Repositories';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/repositories', RepositoriesRouter);

// Export the base-router
export default router;
