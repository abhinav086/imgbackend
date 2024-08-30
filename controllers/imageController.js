import { Image } from "../models/ImageModel.js";

// Function to upload an image
export const uploadImage = async (req, res) => {e
    try {
        const { base64,name} = req.body;
console.log("callllleddd");
        // Validate request inpu
        // Create and save the image
        const newImage = new Image({
           base64,name
        });

        await newImage.save();
        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image: newImage
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
};

// Function to fetch all images
export const getImages = async (req, res) => {
    try {
        // Fetch all images without populating user data
        const images = await Image.find();

        console.log("Fetched images:", images);

        res.status(200).json({
            success: true,
            images
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: "Failed to fetch images" });
    }
};

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params; // Get the image ID from request parameters

        // Find and delete the image by ID
        const image = await Image.findByIdAndDelete(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        console.log("Deleted image:", image);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};
