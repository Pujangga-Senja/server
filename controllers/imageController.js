const axios = require('axios')

class ImageController {
    static textToImage(req,res,next){
        console.log('masuk ke sini kok')
        axios.get(
            'https://api.ritekit.com/v1/images/quote?',
            {
                params : {
                    quote: req.body.quote,
                    author: req.body.author,
                    fontSize: req.body.fontSize,
                    quoteFont: req.body.quoteFont,
                    quoteFontColor: req.body.quoteFontColor,
                    authorFontColor: req.body.authorFontColor,
                    enableHighlight: req.body.enableHighlight,
                    highlightColor: req.body.highlightColor,
                    bgType: req.body.bgType,
                    backgroundColor: req.body.backgroundColor,
                    gradientType: req.body.gradientType,
                    gradientColor1: req.body.gradientColor1,
                    gradientColor2: req.body.gradientColor2,
                    animation: req.body.animation,
                    brandLogo: "https://cdn.ritekit.com/assets/img/common/made-with-ritekit-white.png",
                    client_id: process.env.CLIENT_ID_RITEKIT
                }
            }
        )
            .then(data => {
                let finalData = data.data
                res.status(200).json(finalData)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }
}

module.exports = ImageController