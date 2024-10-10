import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { RequestWithUser } from "src/types/global";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "This is an unfortunate error" });
  }
};

export const getMe = async (req: RequestWithUser, res: Response) => {
  try {
    const user = req.user;
    const userDetails = await userService.getMyDetails(user.email);
    console.log({ user, userDetails });

    return res.status(200).json(userDetails);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "This is an unfortunate error" });
  }
};

export const setupSupabase = async (req: RequestWithUser, res: Response) => {
  try {
    const user = req.user;
    const { supabaseUrl, supabaseAnonKey, supabaseApiKey } = req.body;
    const updatedUserWithSupabaseSetup = await userService.setupSupabase(
      user.email,
      supabaseUrl,
      supabaseAnonKey,
      supabaseApiKey
    );
    return res.status(200).json(updatedUserWithSupabaseSetup);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user property" });
  }
};

export const updateUserProperty = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const { propertyName, propertyValue } = req.body;
    const updatedUser = await userService.updateUserProperty(
      req.user.email,
      propertyName,
      propertyValue
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user property" });
  }
};
