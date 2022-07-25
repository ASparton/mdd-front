export interface UpdateUserQuery {
    username?: string;
    email?: string;
    password?: string;
    displayedName?: string;
    profilePicture?: string | null;
    bio?: string | null;
}

export enum AppMenuTab {
    None = 0,
    Feed = 1,
    Diary = 2,
    Friends = 3
}