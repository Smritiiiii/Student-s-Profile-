
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    studentId:{
        type:Number,
        required: true,
        unique:true

    },
    
    isFirstLogin: {
        type: Boolean,
        default: true,
      },
 
});


// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  });


// login user
userSchema.statics.login = async function ( email, password) {
      const user = await this.findOne({ email});

    
      
      if (!user) {
                throw new Error('Invalid email ');
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
        
             if (!isPasswordValid) {
                 throw new Error('Invalid password');
             }

            
      return user;
    };
    
    module.exports = mongoose.model('User', userSchema);

