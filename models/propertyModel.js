import mongoose from 'mongoose';

// Define the Image schema
const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    base64: {
        type: String,
        
    }
}, { _id: false }); // Set _id to false to avoid creating a separate _id field for each image

// Define the Property schema
const PropertySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    areaInSqFt: {
        type: Number,
      
    },
    location: {
        type: String,
        
    },
    type: { 
        type: String,
    } ,
    price: {
        type: Number,
    },
    description: { 
        type: String,
    } ,
    images: [ImageSchema]
 // Add an array of ImageSchema to store multiple images
}, {
    timestamps: true
});

export default mongoose.model('Property', PropertySchema);
