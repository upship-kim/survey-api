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
        subject: `[견적문의 시스템] ${customName} 님의 견적 문의 요청`,
        html: `<div>
        본 메일은 설문 시스템을 통해 자동 발송되는 문의요청 메일입니다. 
        <br></br>
        <div style="list-style: none; line-height: 30px; padding: 1rem">
            <h2>고객정보</h2>
            <hr></hr>
            <li>고객명: <strong>${customName}</strong></li>
            <li>연락처: <strong>${phone}</strong></li>
            <li>이메일: <strong>${email}</strong></li>
            <li>공사현장주소: <strong>${address}</strong></li>
            <li>건물구분: <strong>${building}</strong></li>
            <li>공사예정일: <strong>${date}</strong></li>
            <li>예산: <strong>${fee}</strong></li>
            <li>침실 수: <strong>${bedRoomCount}</strong></li>
            <li>화장실 수: <strong>${restRoomCount}</strong></li>
            <li>분양면적: <strong>${salesArea}</strong> 평형</li>
            <li>전용면적: <strong>${actureArea}</strong> 평형</li>
            <li>연락가능시간: <strong>${callTime}</strong></li>
            <br></br>
            </div>
            <h2>선택 정보</h2>
            <hr></hr>
            <div style="list-style: none; line-height: 30px; padding: 1rem;">
            ${selectedInfo.map((item, index) => {
                if (Object.entries(item.value).length === 0)
                    return `
                <div>
                <span style="font-size: 1.2rem;font-weight: 700;line-weight: 3rem;">
                ${index + 1}. 설문 항목: ${item.title}</span>
                <li>선택한 옵션이 없습니다</li>
                </div>
                `;
                return `<div
                    style="background: #eeeeee;margin: 1rem 0rem;padding: 12px 1rem;">
                    <span style="font-size: 1.2rem;font-weight: 700;line-weight: 3rem;">
                    ${index + 1}. 설문 항목: ${item.title}</span>
                    <div style="margin-left: 14px;">
                        <strong>1) 선택한 옵션</strong>
                        ${Object.entries(item.value).map((a) => {
                            return `<li style="list-style:none;">
                                - ${a[0]} : ${a[1].join(', ')}
                                </li>`;
                        })}
                    </div>
                    <div style="margin-left: 14px;">
                        ${
                            Object.entries(item.detailValue).length > 0 &&
                            `
                                <strong>2) 선택한 상세 옵션</strong>
                                <br></br>
                            `
                        }
                        ${Object.entries(item.detailValue).map((a) => {
                            if (a[0].length === 0 || a[1].length === 0)
                                return `<li style="list-style:none;">- 선택한 상세 옵션 없음</li>`;
                            return `<li style="list-style:none;">
                                    - ${a[0]} : ${a[1].join(', ')}
                                </li>`;
                        })}
                    </div>
                </div>`;
            })}
        </div>
        </div>`,
    };

    transporter.sendMail(emailOptions, res);
    //전송
}

main().catch(console.error);

module.exports = main;
