import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle login logic, including setting cookies
  res.setHeader('Set-Cookie', 'loggedIn=true; Path=/; Max-Age=3600'); // Set a cookie for one hour
  res.status(200).json({ message: 'Login successful' });
}
