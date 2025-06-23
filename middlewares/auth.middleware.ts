import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AccountUser from "../models/account-user.model";
import { AccountRequest } from "../interfaces/request.interface";

export const verifyTokenUser = async (req: AccountRequest, res: Response, next: NextFunction) => {
    try {
    const token = req.cookies.token;
    
    if (!token) {
        res.json({
            code: "error",
            message: "Vui lòng gửi kèm theo token!"
        });
        return;
    }

    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as jwt.JwtPayload; // Giải mã token
    const { id, email } = decoded;

    const existAccount = await AccountUser.findOne({
        _id: id,
        email: email
    });

    if(!existAccount) {
        res.clearCookie("token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
        return;
    }

    // Gắn vào đối tượng req một cái trường tên là account
    // Express đã định nghĩa sẵn đối tượng của req rồi nên bổ sung vào nữa sẽ không được => tạo 1 interface mới
    req.account = existAccount;

    next();
    } catch (error) {
        res.clearCookie("token");
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
    }
}