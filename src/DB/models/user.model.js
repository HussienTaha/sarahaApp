import mongoose from 'mongoose';

export const UserGender = {
  male: 'male',
  female: 'female'
};

export const UserRoles = {
  admin: 'admin',
  user: 'user'
};

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'Confirm Password is required'],
      minlength: [6, 'Confirm Password must be at least 6 characters'],
    },
    gender: {
      type: String,
      enum: Object.values(UserGender),
    },
    phone: {
      type: String,
      trim: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    image: {
      secure_url:{type :String},
       public_id:{type :String}
      
    },
    age: {
      type: Number,
      min: [10, 'Age must be at least 10'],
      max: [100, 'Age must be less than or equal to 100'],
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.user,
    },

    otp: String,
    verifyCode: String,

    codeExpires: Date,
    codeTries: {
      type: Number,
      default: 0,
    },
    codeBannedUntil: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
