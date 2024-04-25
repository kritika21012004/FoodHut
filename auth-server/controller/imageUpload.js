const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: "dpgxcqqcx",
    api_key: '763339213845828',
    api_secret: 'RvmUDULGGFWm6Ko-GggNZStxBbE',
});
const imageUploadController = async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        res.json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { imageUploadController };