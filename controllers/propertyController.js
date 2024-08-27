import Property from '../models/propertyModel.js';

// Create a new property
export const createProperty = async (req, res) => {
    const { name, areaInSqFt, location, price ,images, type ,description} = req.body;

    try {
        const newProperty = new Property({
            name,
            areaInSqFt,
            location,
            price,
            images,
            type,
            description
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ error: 'Error creating property', details: error.message });
    }
};

// Get all properties
export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching properties', details: error.message });
    }
};
export const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully', property: deletedProperty });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting property', details: error.message });
    }
};
