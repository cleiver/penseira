import { NextApiRequest, NextApiResponse } from 'next'
import escape from 'sql-template-strings'
import { query } from '../lib/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const profiles = await query(escape`
      SELECT *
      FROM link
    `)

  res.status(200).json({ profiles })
}