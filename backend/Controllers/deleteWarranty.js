
const Warranty = require('../Models/Warranty');

const deleteWarranty = async (req, res) => {
  try {
    const { id } = req.params;
    const warranty = await Warranty.findByIdAndDelete(id);
    
    if (!warranty) {
      return res.status(404).json({ success: false, message: 'Warranty not found' });
    }
    
    res.json({ success: true, message: 'Warranty deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { deleteWarranty };  