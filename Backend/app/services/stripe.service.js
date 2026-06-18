const { stripe } = require('../config/stripe');

const createCheckoutSession = async ({ scheduleId, petOwnerId, doctorId, issueReportId, fees, doctorName }) => {
    console.log({
        sechduleId: scheduleId,
        petOwnerId: petOwnerId,
        doctorId: doctorId,
        issueReportId: issueReportId,
        fees: fees,
        doctorName: doctorName
    })
    const expiresAt = Math.floor(Date.now() / 1000) + (30 * 60);
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        expires_at: expiresAt,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: fees * 100,
                    product_data: {
                        name: `Veterinary Consultation - Dr. ${doctorName || 'Expert'}`,
                        description: `Secure checkout hold for slot verification`
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

        metadata: {
            scheduleId,
            petOwnerId,
            doctorId,
            issueReportId,
            fees: fees.toString()
        },
    });

    return session.url;
}

module.exports = {
    createCheckoutSession
}