import express from 'express';
import dotenv from 'dotenv';
import channelRoutes from './routes/channel';
import addChannelRoutes from './routes/addChannel';
import healthRoutes from './routes/health';

// Import routes

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

// Use routes
app.use('/channel', channelRoutes); // Route for handling channel related requests
app.use('/addchannel', addChannelRoutes); // Route for handling add channel requests
app.use('/health', healthRoutes); // Route for handling health check requests

export default app;
