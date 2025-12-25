const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect('mongodb+srv://akashswaero_db_user:epzGEn14VtSU3QeC@cluster0.udovw0w.mongodb.net/car-rental');
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'akashswaero@gmail.com' });
        
        if (existingAdmin) {
            console.log('Admin already exists');
            
            // Update password if needed
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Hsaka@100', salt);
            existingAdmin.password = hashedPassword;
            existingAdmin.role = 'admin';
            await existingAdmin.save();
            console.log('Admin password updated');
        } else {
            // Create new admin
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Hsaka@100', salt);

            const admin = new User({
                name: 'Admin',
                email: 'akashswaero@gmail.com',
                password: hashedPassword,
                role: 'admin',
                phone: '+1234567890',
                isVerified: true,
                accountStatus: 'active'
            });

            await admin.save();
            console.log('✅ Admin created successfully');
            console.log('Email: akashswaero@gmail.com');
            console.log('Password: Hsaka@100');
        }

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
