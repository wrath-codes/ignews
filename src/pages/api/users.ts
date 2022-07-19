import {NextApiRequest, NextApiResponse} from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {
            id: 1,
            name: 'John Doe'
        },
        {
            id: 2,
            name: 'Jane Doe'
        },
        {
            id: 3,
            name: 'Rapha Vaz'
        }
    ]

    return response.json(users)
}

// Serverless Framework
// Language: typescript
// Path: src/pages/api/users.ts
// Compare this snippet from src/services/stripe.ts:
