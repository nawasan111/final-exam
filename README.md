# <p align="center">Final exam (ยังไม่เสร็จ)</p>

<p align="center">
<img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/nawasan111/final-exam" />
<img alt="" src="https://img.shields.io/github/repo-size/nawasan111/final-exam" />
<img alt="GitHub Issues" src="https://img.shields.io/github/issues/nawasan111/final-exam" />
<img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/nawasan111/final-exam" />
<img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/nawasan111/final-exam" />
<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/nawasan111/final-exam" />
</p>

final exam of web programming with ~~PHP~~ **JavaScript** and using ~~Framework~~ **Libraries**

... and MVC

## Get started

- clone this repo
  - ติดตั้ง dependencies ด้วยคำสั่ง `pnpm install`
  - สร้างไฟล์ `.env` เหมือนกับ `.env.example`
  - ใส่ข้อมูลการเชื่อมต่อที่ `.env` 
  - migration
    - `npx prisma migrate dev` เพื่อทำการ migrate ฐานข้อมูล
    - * หาก error อาจจะต้องทำการ upgrade mysql โดย
      - รันไฟล์ชื่อ `mysql_upgrade` ที่โฟลเดอร์ `xampp/bin`
  - กำหนดสิทธิ์ admin 
    - หลังจากสมัครสมาชิก เข้าไปยังฐานข้อมูลและเปลี่ยน `rank` ของ user เป็น 1
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