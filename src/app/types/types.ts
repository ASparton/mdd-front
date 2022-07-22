export interface UpdateUserQuery {
    username?: string;
    email?: string;
    password?: string;
    displayedName?: string;
    profilePicture?: string | null;
    bio?: string | null;
}