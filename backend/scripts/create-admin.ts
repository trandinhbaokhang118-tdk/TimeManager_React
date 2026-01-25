import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function main() {
    console.log('');
    console.log('🔐 TẠO TÀI KHOẢN ADMIN CHÍNH THỨC');
    console.log('================================');
    console.log('');

    // Get admin info
    const name = await question('Tên của bạn: ');
    const email = await question('Email: ');
    const password = await question('Password: ');
    const confirmPassword = await question('Xác nhận password: ');

    // Validate
    if (!name || !email || !password) {
        console.error('❌ Vui lòng điền đầy đủ thông tin!');
        process.exit(1);
    }

    if (password !== confirmPassword) {
        console.error('❌ Password không khớp!');
        process.exit(1);
    }

    if (password.length < 6) {
        console.error('❌ Password phải có ít nhất 6 ký tự!');
        process.exit(1);
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.error('❌ Email đã tồn tại!');
        process.exit(1);
    }

    // Hash password
    const passwordHash = await argon2.hash(password);

    // Create admin
    const admin = await prisma.user.create({
        data: {
            email,
            passwordHash,
            name,
            role: 'ADMIN',
        },
    });

    console.log('');
    console.log('✅ Tạo tài khoản admin thành công!');
    console.log('');
    console.log('📝 Thông tin tài khoản:');
    console.log('   Tên:', admin.name);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   ID:', admin.id);
    console.log('');
    console.log('🚀 Bạn có thể đăng nhập ngay bây giờ!');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Lỗi:', e.message);
        process.exit(1);
    })
    .finally(async () => {
        rl.close();
        await prisma.$disconnect();
    });
