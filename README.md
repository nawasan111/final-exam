<p align="center">
    <img width="40" height="30" alt="nextjs" src="https://github.com/Arikato111/Arikato111/raw/main/icons/nextjs-original.svg">
    <img width="40" height="30" alt="tailwindcss" src="https://github.com/Arikato111/Arikato111/raw/main/icons/tailwindcss-plain.svg">
    <img width="40" height="30" alt="express.js" src="https://github.com/tandpfun/skill-icons/raw/main/icons/ExpressJS-Dark.svg">
    <img height="30" width="40" src="https://github.com/tandpfun/skill-icons/raw/main/icons/Prisma.svg" alt="prisma">
    <img width="40" height="30" alt="Mongodb" src="https://github.com/Arikato111/Arikato111/raw/main/icons/mongodb-plain.svg">

</p>

# <p align="center">Final exam</p>

<p align="center">
<img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/nawasan111/final-exam" />
<img alt="" src="https://img.shields.io/github/repo-size/nawasan111/final-exam" />
<img alt="GitHub Issues" src="https://img.shields.io/github/issues/nawasan111/final-exam" />
<img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/nawasan111/final-exam" />
<img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/nawasan111/final-exam" />
<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/nawasan111/final-exam" />
</p>

final exam of web programming with ~~PHP~~ **JavaScript** and using ~~Laravel~~ **Next.js**

... and MVC

## Updates!

เปลี่ยนมาใช้ฐานข้อมูล Mongodb จากเดิมที่ใช้ MySQL เพราะว่า Mongodb ไม่เสียเงิน แต่อาจทำให้ต้องใช้เวลาโหลดมากขึ้นเพราะมันช้า

## Get started

- clone this repo
- ติดตั้ง dependencies ด้วยคำสั่ง `pnpm install` หรือ `npm install`
- สร้างไฟล์ `.env` เหมือนกับ `.env.example`
- ใส่ข้อมูลการเชื่อมต่อที่ `.env`
  - ฐานข้อมูล Mongodb
  - jwt-token (ใส่ข้อความหรืออะไรสักอย่าง)
- migration
  - `npx prisma generate` เพื่อทำการ generate ฐานข้อมูล (ไม่แน่ใจ ไปหาอ่าน [document](https://www.prisma.io/docs/concepts/database-connectors/mongodb) เพิ่มเติมนะ)
  - ตัวอย่างฐานข้อมูลสำหรับ import เข้า mongodb : [ดาวน์โหลดที่นี่](https://github.com/nawasan111/final-exam/releases/download/mongodb_database/final-exam.tar.gz)
- กำหนดสิทธิ์ admin
  - หลังจากสมัครสมาชิก เข้าไปยังฐานข้อมูลและเปลี่ยน `rank` ของ user เป็น `true`
  - เมื่อเปลี่ยนเสร็จ ต้องทำการเข้าสู่ระบบใหม่อีกครั้ง
- `pnpm d` สำหรับการรัน dev mode

## ข้อควรระวัง

#### ความปลอดภัย

เนื่องด้วยเป็นการเขียนเพื่อส่งงานอาจารย์ เพื่อประหยัดแรงและเวลาจึงไม่ได้ทำความปลอดภัยที่ดีพอ

1. ไม่มีการตรวจสอบข้อมูลที่ api รับเข้ามา ทั้งความถูกต้องของข้อมูล เช่น เบอร์โทร, อีเมล
2. ไม่มีการตรวจสอบขนาดของข้อมูลที่ api รับเข้ามา
3. ระบบ auth เป็นแบบ token ไม่มีวันหมดอายุ แต่กำหนดให้ browser เก็บ token ไว้เพียงหนึ่งวัน และมีการอ้างอิงข้อมูลผู้ใช้จาก token จึงทำให้ข้อมูลอาจล้าสมัยได้ง่าย

#### ด้าน back-end

1. ไม่มีการจัดการ error หรือการตอบกลับฝั่ง client กรณี error ที่ชัดเจน

#### ฐานข้อมูล

- ได้มีการย้ายฐานข้อมูลจาก MySQL มาเป็น Mongodb จึงอาจจะทำให้เกิดข้อผิดพลาดได้