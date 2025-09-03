import { Router } from "express";
import * as UC from "./user.service.js";
import { authentication } from "../../middleware/authantction.js";
import { vaildation } from "../../middleware/vaildation.js";
import {
  freezeProfileValidationSchema,
  signinuserValidationSchema,
  unfreezeProfileValidationSchema,
  updateImageValidationSchema,
  updatePasswordSchema,
  updateProfileValidationSchema,
  userValidationSchema,
  verifyOtpValidationSchema,
  verifyOtpValidationSchemaa,
} from "./user.vaildation.js";
import { authorization } from "../../middleware/authorization.js";
import { UserRoles } from "../../DB/models/user.model.js";

import {
  MIME_GROUPS,
  multerUploadhost,
  multerUploadLocal,
} from "../../middleware/multer.js";
import messageRouter from "../messages/message.controller.js";
const userRouter = Router({ caseSensitive: true, strict: true });

userRouter.use("/:id/messages", messageRouter);
// userRouter.post("/signup", multerUploadLocal("users/profile",[...MIME_GROUPS.images,...MIME_GROUPS.docs,...MIME_GROUPS.audio,...MIME_GROUPS.videos]).single("image"),UC.signup);
userRouter.post(
  "/signup",
  multerUploadhost({
    custemPrameter: "users/profile",
    custemExtation: [
      ...MIME_GROUPS.images,
      ...MIME_GROUPS.docs,
      ...MIME_GROUPS.audio,
      ...MIME_GROUPS.videos,
    ],
  }).single("image"),
  vaildation(userValidationSchema),
  UC.signup
);
userRouter.patch(
  "/updateProfileImage",
  authentication,
  multerUploadhost({
    custemPrameter: "users/profile",
    custemExtation: [
      ...MIME_GROUPS.images,
      ...MIME_GROUPS.docs,
      ...MIME_GROUPS.audio,
      ...MIME_GROUPS.videos,
    ],
  }).single("image"),
  UC.updateProfileImage
);
 userRouter.delete("/deleteProfileImage", authentication, UC.deleteProfileImage);
userRouter.post("/signin", vaildation(signinuserValidationSchema), UC.signin);
userRouter.post("/confirm-code", UC.confirmCode);
userRouter.post("/refreshtoken", UC.refreshtoken);
userRouter.post("/logout", authentication, UC.logout);
userRouter.post(
  "/forgetPassword",
  vaildation(verifyOtpValidationSchema),
  UC.forgetPassword
);
userRouter.post(
  "/auth/verify-otp",
  vaildation(verifyOtpValidationSchemaa),
  UC.verifyOtp
);
userRouter.post("/send-code", UC.sendVerificationCode);
userRouter.get(
  "/profile",
  authentication,
  authorization([Object.values(UserRoles)]),
  UC.profile
);
userRouter.get("/getprofiledate/:id", UC.getprofiledate);
userRouter.get("/confirmemail/:token", UC.confermedEmail);
userRouter.patch(
  "/changePassword",
  vaildation(updatePasswordSchema),
  authentication,
  UC.changePassword
);
userRouter.put(
  "/updateProfile",
  vaildation(updateProfileValidationSchema),
  authentication,
  UC.updateProfile
);
userRouter.delete(
  "/unfreeze/{:id}",
  vaildation(unfreezeProfileValidationSchema),
  authentication,
  UC.unfreezeProfile
);
userRouter.delete(
  "/freeze/{:id}",
  vaildation(freezeProfileValidationSchema),
  authentication,
  UC.freezeProfile
);

export default userRouter;
