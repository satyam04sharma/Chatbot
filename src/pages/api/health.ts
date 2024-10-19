import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Handles requests to the health check endpoint.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 *
 * @returns {Promise<void>}
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('Health check endpoint called');
        res.status(200).json({ status: 'OK' });
    } catch (error) {
        console.error('Error in health check:', error);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
}