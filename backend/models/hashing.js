// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const Admin = require('./adminModel'); 


// mongoose.connect("mongodb://127.0.0.1:27017/profile")
//     .then(() => {
//         console.log("Connected to the database");

//         // function to hash the passwords 
//         hashPasswords();
//     })
//     .catch((err) => {
//         console.error(err.message);
//         process.exit(1); // Exit the script if there's an error
//     });

//     async function hashPasswords() {
//         try {
         

//             const adminWithPlainTextPasswords = await Admin.find({ password: { $exists: true } });
          
//             const saltRounds = 10;
    
//             for (const admin of adminWithPlainTextPasswords) {
//                 const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
    
//                 admin.password = hashedPassword;
//                 await admin.save();
//             }
    
//             console.log('Passwords hashed and updated successfully');
//         } catch (error) {
//             console.error('Error hashing passwords:', error);
//         } finally {
//             // Close the database connection when done
//             mongoose.connection.close();
//         }
//     }





const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel'); 


mongoose.connect("mongodb://127.0.0.1:27017/profile")
    .then(() => {
        console.log("Connected to the database");

        // function to hash the passwords 
        hashPasswords();
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1); // Exit the script if there's an error
    });

    async function hashPasswords() {
        try {
            const usersWithPlainTextPasswords = await User.find({ password: { $exists: true } });
    
            const saltRounds = 10;
    
            for (const user of usersWithPlainTextPasswords) {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
                user.password = hashedPassword;
                await user.save();
            }
    
            console.log('Passwords hashed and updated successfully');
        } catch (error) {
            console.error('Error hashing passwords:', error);
        } finally {
            // Close the database connection when done
            mongoose.connection.close();
        }
    }
    
    
    

