import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import * as companyValidate from "../validates/company.validate";
import multer from "multer";
import { storage } from "../helpers/cloudinary.helper"
import * as authMiddleware from "../middlewares/auth.middleware";

const router = Router();

const upload = multer({ storage: storage });

router.post(
  '/register', 
  companyValidate.registerPost, 
  companyController.registerPost
);

router.post(
  '/login', 
  companyValidate.loginPost, 
  companyController.loginPost
);

router.patch('/profile',
  authMiddleware.verifyTokenCompany, // Kiểm tra token người dùng
  upload.single('logo'), // Sử dụng multer để upload file
  companyController.profilePatch
)

export default router;
