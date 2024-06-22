const Cus = require("../../models/Customize/CusModels");

const getAllCus = async (req, res, next) => {
    try {
        const cuss = await Cus.find();
        res.status(200).json({ cuss });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addCus = async (req, res, next) => {
    const { 
        FirstName, 
        LastName, 
        AccountUsername, 
        MobileNumber, 
        Address, 
        City, 
        Province, 
        Zip, 
        ChooseItem, 
        ChooseDesign, 
        NumberOfMaterials, 
        MaterialTypes, 
        MaterialWeights, 
        AttributeType, 
        Dimension, 
        ChooseStoneType, 
        ChooseStone, 
        StoneWeight 
    } = req.body;
    try {
        const cus = new Cus({ 
            FirstName, 
            LastName, 
            AccountUsername, 
            MobileNumber, 
            Address, 
            City, 
            Province, 
            Zip, 
            ChooseItem, 
            ChooseDesign, 
            NumberOfMaterials, 
            MaterialTypes, 
            MaterialWeights, 
            AttributeType, 
            Dimension, 
            ChooseStoneType, 
            ChooseStone, 
            StoneWeight 
        });
        await cus.save();
        res.status(201).json({ cus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to add customize order" });
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cus = await Cus.findById(id);
        if (!cus) {
            return res.status(404).json({ message: "Cus not found" });
        }
        res.status(200).json({ cus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCus = async (req, res, next) => {
    const id = req.params.id;
    const { 
        FirstName, 
        LastName, 
        AccountUsername, 
        MobileNumber, 
        Address, 
        City, 
        Province, 
        Zip, 
        ChooseItem, 
        ChooseDesign, 
        NumberOfMaterials, 
        MaterialTypes, 
        MaterialWeights, 
        AttributeType, 
        Dimension, 
        ChooseStoneType, 
        ChooseStone, 
        StoneWeight 
    } = req.body;
    try {
        let cus = await Cus.findByIdAndUpdate(id, { 
            FirstName, 
            LastName, 
            AccountUsername, 
            MobileNumber, 
            Address, 
            City, 
            Province, 
            Zip, 
            ChooseItem, 
            ChooseDesign, 
            NumberOfMaterials, 
            MaterialTypes, 
            MaterialWeights, 
            AttributeType, 
            Dimension, 
            ChooseStoneType, 
            ChooseStone, 
            StoneWeight 
        }, { new: true });
        if (!cus) {
            return res.status(404).json({ message: "User not updated" });
        }
        res.status(200).json({ cus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCus = async (req, res, next) => {
    const id = req.params.id;
    try {
        const cus = await Cus.findByIdAndDelete(id);
        if (!cus) {
            return res.status(404).json({ message: "Cus not deleted" });
        }
        res.status(200).json({ cus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllCus,
    addCus,
    getById,
    updateCus,
    deleteCus
};