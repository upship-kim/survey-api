const mongoose = require('mongoose');

const { Schema } = mongoose;

const OptionsSchema = new Schema(
    {
        id: Number,
        name: String,
        img: String,
    },
    { _id: false, id: true },
);
const RowSchema = new Schema(
    {
        id: Number,
        name: String,
        detailTitle: String,
        type: Number,
        options: [OptionsSchema],
    },
    { _id: false, id: true },
);
const SelectSchema = new Schema(
    {
        id: Number,
        title: String,
        type: Number,
        options: [RowSchema],
    },
    { _id: false, id: true },
);
const CardSchema = new Schema(
    {
        id: Number,
        title: String,
        rows: [SelectSchema],
    },
    { _id: true, id: true },
);

const Template = mongoose.model('Template', CardSchema);
module.exports = Template;
