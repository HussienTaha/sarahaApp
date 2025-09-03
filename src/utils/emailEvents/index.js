 import { EventEmitter } from "events";
import { sendEmail } from "../../service/sendemail.js";
import  jwt  from "jsonwebtoken";
 export const eventEmitter = new EventEmitter();
 eventEmitter.on("sendEmail",async(data)=>{
    const {email}=data

       const token = jwt.sign({ email }, process.env.SIGNTURE, { expiresIn: "3m" });
    const link = `http://localhost:3000/users/confirmemail/${token}`;
       

    const isSend = await sendEmail({
      to: email,
      subject: "Confirm Email",
      html: `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h2 style="color: #333;">🎉 أهلاً بك في تطبيق صراحة!</h2>

    <p style="font-size: 16px; color: #555;">
      تطبيق <strong>صراحة</strong> هو المكان اللي تقدر تعبّر فيه بحرية، من غير خوف أو حكم من حد.
    </p>
    <p style="font-size: 16px; color: #555;">
      اكتشف آراء الناس عنك بكل شفافية... وجاوب بصراحة!
    </p>
    <p style="font-size: 16px; color: #555;">
      خصوصيتك دايمًا في أمان، وكل الرسائل مجهولة 100%.
    </p>
    <p style="font-size: 16px; color: #555;">
      ابدأ رحلتك مع الصراحة وشارك الرابط الخاص بيك مع أصحابك دلوقتي!
    </p>

    <p style="font-size: 16px; color: #555;">
      اضغط على الزر التالي لتأكيد حسابك:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">
        تأكيد الحساب
      </a>
    </div>

    <p style="font-size: 14px; color: #888;">
      لو معندكش فكرة عن الرسالة دي، ممكن تتجاهلها بأمان.
    </p>

    <hr style="margin-top: 40px;">
    <p style="text-align: center; font-size: 12px; color: #aaa;">
      © 2025 Saraha App. All rights reserved.
    </p>
  </div>
</div>
`,
    });

    if (!isSend) {
      return res
        .status(500)
        .json({
          message: "Failed to send email",
          message: error.message,
          error,
        });
    }


   eventEmitter.on("forgetPassword", async (data) => {

  
    const {email,otp} =data
   const send= await sendEmail({
      to: email,
      subject: "🔐 Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 500px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">🔐 Verification Code</h2>
            <p style="font-size: 16px; color: #555;">Hello <strong>${email}</strong>,</p>
            <p style="font-size: 16px; color: #555;">
              Here is your One-Time Password (OTP) to reset your password:
            </p>
            <div style="font-size: 28px; font-weight: bold; text-align: center; margin: 20px 0; color: #1a73e8;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: #999;">
              This code will expire in 2 minutes. Please do not share it with anyone.
            </p>
            <p style="font-size: 14px; color: #777;">Thank you,<br/>Your App Team</p>
          </div>
        </div>
      `
    });
   
    if( !send )
    console.error("❌ Error sending OTP email:", err);
 
});


 })

