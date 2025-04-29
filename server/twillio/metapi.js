require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function sendTemplateMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v22.0/574663595730572/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '916369012255',
            type: 'template',
            template:{
                name: 'discount',
                language: {
                    code: 'en_US'
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'text',
                                text: 'John Doe'
                            }
                        ]
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: '50'
                            }
                        ]
                    }
                ]
            }
        })
    })

    console.log(response.data)
}
// sendTemplateMessage()
async function sendTextMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: 'phone_number',
            type: 'text',
            text:{
                body: 'This is a text message'
            }
        })
    })

    console.log(response.data) 
}

async function sendMediaMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: 'phone_number',
            type: 'image',
            image:{
                //link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',
                id: '512126264622813',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)    
}

async function uploadImage() {
    const data = new FormData()
    data.append('messaging_product', 'whatsapp')
    data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), { contentType: 'image/png' })
    data.append('type', 'image/png')

    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/media',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`
        },
        data: data
    })

    console.log(response.data)     
}

// sendTemplateMessage()

// sendTextMessage()

// sendMediaMessage()

// uploadImage()


async function sendMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v22.0/574663595730572/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '916369012255',
            type: 'template',
            template: {
                name: 'maintemplate',
                language: {
                    code: 'en_US'
                },
                components: [
                    {
                        type: 'header',
                        parameters: [
                            {
                                type: 'text',
                                text: 'Telecaller: {{message_content}}'
                            }
                        ]
                    },
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: 'Hello! Your message: {{message_content}}'
                            }
                        ]
                    },
                    {
                        type: 'footer',
                        parameters: [
                            {
                                type: 'text',
                                text: '' // Optional footer text (you can add it here)
                            }
                        ]
                    }
                ]
            }
        })
    })
    console.log(response.data)
}

sendMessage();




async function send1textmessage(){
    const response=await axios({
        url:'https://graph.facebook.com/v22.0/574663595730572/messages',
        method:'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            messaging_product:'whatsapp',
            to:'916369012255',
            type:'text',
          text:{
            body:'this is text message',
          }
        })
    })
    console.log(response.data)
}


// send1textmessage()