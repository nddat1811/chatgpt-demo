import { Configuration, OpenAIApi } from 'openai';

import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-3D6xBSd1Yaz0ErFb6Ssj650A",
    apiKey: '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',
});
const token = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res)=>{
    const model = req.body.model;
    const userMessage = req.body.messages.find(msg => msg.role === 'user').content;
    const response = await token.createCompletion({
        model: 'text-davinci-003',
        prompt: `${userMessage}`,
        max_tokens: 400,
        temperature: 0,
    });

    if(response.data.choices[0].text){
        res.json({
            message: response.data.choices[0].text
        });
    }
    
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000')
});
