// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import express, { Request, Response } from 'express';
import axios from 'axios';
import { getAPIEndpoint } from '../lib/envHelper';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const { invitationCode } = req.query;
  console.log(getAPIEndpoint());
  if (!invitationCode) {
    return res.status(400).send({ message: 'Invitation code is required' });
  }

  try {
    const response = await axios.post(getAPIEndpoint(), null, {
      params: { invitationCode },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.send(response.data);
  } catch (error) {
    console.error('Error fetching details:', error.response?.data || error.message);
    res.status(error.response?.status || 500).send({ message: 'Failed to process invitation code' });
  }
});

export default router;
