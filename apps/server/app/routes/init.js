import authRoutes from './auth/auth.routes.js';
import taskRoutes from './task/task.routes.js';

const initializeRoutes = (app) => {
  app.use('/api', authRoutes);
  app.use('/api/tasks', taskRoutes);
};

export default initializeRoutes;
