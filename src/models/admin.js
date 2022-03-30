const mongoose = require('mongoose');

const { Schema } = mongoose;

const OptionSchema = new Schema(
    {
        // id: Number,
        value: String,
        type: Number,
        name: String,
        checked: Boolean,
        img: Buffer,
    },
    { _id: false },
);
const OptionsSchema = new Schema(
    {
        // id: Number,
        value: String,
        type: Number,
        name: String,
        checked: Boolean,
        img: Buffer,
        options: [OptionSchema],
    },
    { _id: false },
);
const RowSchema = new Schema(
    {
        // id: Number,
        title: String,
        type: Number,
        options: [OptionsSchema],
        etc: String,
    },
    { _id: false },
);
const SelectSchema = new Schema(
    {
        id: Number,
        title: String,
        rows: [RowSchema],
    },
    { _id: true },
);

const Template = mongoose.model('Template', SelectSchema);
module.exports = Template;
// const temp =
//     {
//         id: '',
//         title: '',
//         rows: [
//             //한개의 행
//             {
//                 id: 0,
//                 title: '',
//                 // 0 = 입력형, 1 = 단일 선택형, 2 = 복수 선택형
//                 type: 0,
//                 options: [
//                     {
//                         ...option,
//                         detailOption: [{ ...option, detailOption: [{ ...option }] }],
//                     },
//                 ],
//                 value: '',
//                 img: Buffer,
//             },
//         ],
//     };
