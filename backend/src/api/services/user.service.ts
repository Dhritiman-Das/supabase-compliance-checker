import User, { IUserDocument } from "../../models/User";
import { IUser } from "src/types/user";

export class UserService {
  async createUser(userData: IUser): Promise<IUserDocument> {
    const user = new User(userData);
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return await User.findOne({ email });
  }

  async getMyDetails(email: string): Promise<IUserDocument | null> {
    return await this.getUserByEmail(email);
  }

  async setupSupabase(
    email: string,
    supabaseUrl: string,
    supabaseAnonKey: string,
    supabaseApiKey: string
  ): Promise<IUserDocument | null> {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          supabaseUrl,
          supabaseAnonKey,
          supabaseApiKey,
          isSupabaseSetup: true,
        },
      },
      { new: true }
    );
    return updatedUser;
  }

  async updateUserProperty(
    email: string,
    propertyName: string,
    propertyValue: any
  ): Promise<IUserDocument | null> {
    const updateObject = { [propertyName]: propertyValue };
    return await User.findOneAndUpdate(
      { email },
      { $set: updateObject },
      { new: true, runValidators: true }
    );
  }
}
