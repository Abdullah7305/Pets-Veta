const catchAsync = require('../utils/CatchAsync');

const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');
const { PaymentStatus } = require('@prisma/client')

const stripeWebhook = async (req, res) => {
    let event;

    try {
        const sig = req.headers["stripe-signature"];

        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }


    switch (event.type) {


        case "checkout.session.completed": {
            const session = event.data.object;

            const appointmentId = session.metadata.appointmentId;

            await prisma.appointment.update({
                where: { id: appointmentId },
                data: {
                    paymentStatus: PaymentStatus.PAID,

                },
            });

            console.log("Payment successful:", appointmentId);
            break;
        }


        case "payment_intent.payment_failed": {
            console.log("Payment failed");
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};


module.exports = {
    stripeWebhook
}