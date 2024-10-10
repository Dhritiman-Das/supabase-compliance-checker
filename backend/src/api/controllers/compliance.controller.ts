import { Response } from "express";
import { ComplianceService } from "../services/compliance.service";
import { RequestWithUser } from "src/types/global";
import { UserService } from "../services/user.service";

const complianceChecker = new ComplianceService();
const userService = new UserService();

export const checkCompliance = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const userDetails = await userService.getMyDetails(user.email);
  const { supabaseAnonKey, supabaseUrl, supabaseApiKey } = userDetails;
  if (!supabaseUrl || !supabaseAnonKey || !supabaseApiKey) {
    res.status(400).json({ error: "Missing Supabase credentials" });
  }
  try {
    const complianceStatus = await complianceChecker.checkCompliance(
      supabaseUrl,
      supabaseAnonKey,
      supabaseApiKey
    );
    return res.status(200).json(complianceStatus);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "This is an unfortunate error" });
  }
};
