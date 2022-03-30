const mongoose = require('mongoose');

const { Schema } = mongoose;

const SurveySchema = new Schema({
    title: String,
});

const form = {
    baseInfo: '',
};

const temp = [
    {
        id: '',
        title: '',
        rows: [
            //한개의 행
            {
                id: 0,
                title: '',
                // 0 = 입력형, 1 = 단일 선택형, 2 = 복수 선택형
                type: 0,
                options: [
                    {
                        ...option,
                        detailOption: [{ ...option, detailOption: [{ ...option }] }],
                    },
                ],
                value: '',
                img: Buffer,
            },
        ],
    },
];

const option = {
    id: 0,
    value: '',
    type: 0,
    name: '',
    checked: true,
    img: Buffer,
};
