
import type {NextApiRequest, NextApiResponse} from 'next';
import { getSession } from "next-auth/client";
import { google } from 'googleapis';









export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    const session = await getSession({req})
    const googleAuth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY
        },
        scopes: ['https://www.googleapis.com/auth/analytics.readonly']
      });


    
       
          const analytics = google.analytics({
            auth: googleAuth,
            version: 'v3'
          });
        

            const response = await analytics.data.ga.get({
                'end-date': 'today',
                ids: 'ga:253245639',
                metrics: 'ga:pageviews',
                'start-date': '2021-10-14'
        });
        
        return res.status(200).json({
          pageViews: response.data
        });
    
    
    
}


