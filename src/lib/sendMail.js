const nodemailer = require('nodemailer');

async function main(res) {
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
        html:
            '<h1 >Binding에서 새로운 비밀번호를 알려드립니다.</h1> <h2> 비밀번호 : ' +
            '1234' +
            '</h2>' +
            '<h3 style="color: crimson;">임시 비밀번호로 로그인 하신 후, 반드시 비밀번호를 수정해 주세요.</h3>' +
            '<img src="https://firebasestorage.googleapis.com/v0/b/mangoplate-a1a46.appspot.com/o/mailImg.png?alt=media&token=75e07db2-5aa6-4cb2-809d-776ba037fdec">',
    };
    transporter.sendMail(emailOptions, res);
    //전송
}

main().catch(console.error);

module.exports = main;
