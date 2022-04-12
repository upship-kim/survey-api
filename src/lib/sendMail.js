const nodemailer = require('nodemailer');

async function main(res) {
    const { basicInfo, selectedInfo } = res;
    const {
        customName,
        phone,
        email,
        address,
        building,
        date,
        fee,
        restRoomCount,
        bedRoomCount,
        salesArea,
        actureArea,
        callTime,
    } = basicInfo;
    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_MAIL,
        port: process.env.SEND_MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.SEND_EMAIL_ADDRESS,
            pass: process.env.SEND_EMAIL_PASSWORD,
        },
    });

    const emailOptions = {
        // 옵션값 설정
        from: process.env.SEND_EMAIL_ADDRESS,
        to: process.env.RECEIVE_EMAIL_ADDRESS,
        subject: '테스트 메일 입니다 ',
        html: `<div style={{ listStyle: "none", lineHeight: "30px", padding: "1rem" }}>
            <h2>고객정보</h2>
            <hr></hr>
            <li>고객명: ${customName}</li>
            <li>연락처: ${phone}</li>
            <li>이메일: ${email}</li>
            <li>공사현장주소: ${address}</li>
            <li>건물구분: ${building}</li>
            <li>공사예정일: ${date}</li>
            <li>예산: ${fee}</li>
            <li>침실 수: ${bedRoomCount}</li>
            <li>화장실 수: ${restRoomCount}</li>
            <li>분양면적: ${salesArea} 평형</li>
            <li>전용면적: ${actureArea} 평형</li>
            <li>연락가능시간: ${callTime}</li>
            <br></br>
            <h2>선택 정보</h2>
            <hr></hr>
            <div style={{ background: "#eeeeee" }}>
                <h4>설문 항목: 주방 선택일까?</h4>
                <li>주방 선택사항 : value</li>
                <li>냉장고 유형 선택: value</li>
            </div>
        </div>`,
    };

    // transporter.sendMail(emailOptions, res);
    //전송
}

main().catch(console.error);

module.exports = main;
