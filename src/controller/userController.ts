import { UserProfileManager } from "../models/register";

export class UserController {
    private userProfileManager: UserProfileManager;

    public constructor() {
        this.userProfileManager = new UserProfileManager();
    }

    public async register(email: string, username: string, firstname: string, lastname: string, password: string): Promise<void> {
        try {
            await this.userProfileManager.register(email, username, firstname, lastname, password);
            // Additional logic if needed after successful registration
        } catch (error) {
            // Handle or throw error
            throw error;
        }
    }

    public async login(email: string, password: string): Promise<void> {
        try {
            await this.userProfileManager.login(email, password);
            // Additional logic if needed after successful login
        } catch (error) {
            // Handle or throw error
            throw error;
        }
    }

    public logout(): void {
        this.userProfileManager.logout();
        // Additional logic if needed after logout
    }

    public async updateProfile(firstname: string, lastname: string, username: string, email: string): Promise<void> {
        try {
            await this.userProfileManager.updateProfile(firstname, lastname, username, email);
            // Additional logic if needed after updating profile
        } catch (error) {
            // Handle or throw error
            throw error;
        }
    }

    public async deleteProfile(): Promise<void> {
        try {
            await this.userProfileManager.deleteProfile();
            // Additional logic if needed after account deletion
        } catch (error) {
            // Handle or throw error
            throw error;
        }
    }
}
