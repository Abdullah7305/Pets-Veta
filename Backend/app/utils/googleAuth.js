const { OAuth2Client } = require('google-auth-library')

console.log("Client", process.env.CLIENT_ID)
console.log("Client Seret", process.env.CLIENT_SECRET)
console.log("Client Callback", process.env.GOOGLE_CALLBACK_URL)

const client = new OAuth2Client(

    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
)

const getGoogleAuthUrl = () => {
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ]
    })
}

const getGoogleProfileToken = async (code) => {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.Client_ID
    });

    return ticket.getPayload();
}

module.exports = {
    getGoogleAuthUrl,
    getGoogleProfileToken
}