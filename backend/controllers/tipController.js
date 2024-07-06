const Tip = require('../models/Tip');

exports.calculateTip = async (req, res) => {
  const { place, totalAmount, tipPercentage } = req.body;

  if (!place || !totalAmount || !tipPercentage) {
    return res.status(400).json({ message: 'invalid field' });
  }

  try {
    const tipAmount = (totalAmount * tipPercentage) / 100;
    const tip = new Tip({ userId: req.user.id, place, totalAmount, tipAmount });
    await tip.save();

    res.status(200).json({ tip: tipAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTips = async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = new Date(startDate.split('-').reverse().join('-'));
  const end = new Date(endDate.split('-').reverse().join('-'));

  try {
    const tips = await Tip.find({
      userId: req.user.id,
      date: { $gte: start, $lte: end }
    });

    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
