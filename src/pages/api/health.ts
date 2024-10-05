import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('Health check endpoint called');
        res.status(200).json({ status: 'OK' });
    } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
}