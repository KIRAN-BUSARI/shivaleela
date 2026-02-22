import mongoose from "mongoose"

const imageUploadSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const ImageUpload = mongoose.model("ImageUpload", imageUploadSchema)

export default ImageUpload