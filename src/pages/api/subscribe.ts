import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";


// Tipo User
type User = {
    ref: {
      id: string;
    }
    data: {
      stripe_customer_id: string;
    }
  }


export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    // checa o modo de requisição
    if(req.method === 'POST') {
      const session = await getSession({ req })
      const user = await fauna.query<User>(
          q.Get(
              q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(session.user.email)
              )
          )
      )
      let customerId = user.data.stripe_customer_id;

      if(!customerId){
          const stripeCustomer = await stripe.customers.create({
              email: session.user.email,
              //metadata
          })
          await fauna.query(
              q.Update(
                  q.Ref(q.Collection('users'), user.ref.id),
                  {
                      data: {
                          stripe_customer_id: stripeCustomer.id
                      }
                  }
              )
          )
          customerId = stripeCustomer.id
      }
        // cria sessão de checkout
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            // cliente
            customer: customerId,
            // metodo de pagamento
            payment_method_types: ['card'],
            // dados de pagamento
            billing_address_collection: 'required',
            // dados do pedido
            line_items: [
                {
                    price: 'price_1LNL1oFF4ZGYrXqWRiRYKWEe',
                    quantity: 1
                }
            ],
            // modo de pagamento
            mode: 'subscription',
            // promoção
            allow_promotion_codes: true,
            // redireciona para os posts
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        // retorna a sessão de checkout
        return res.status(200).json({ sessionId : stripeCheckoutSession.id })
    } else {
        // permite o metodo POST
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}