export type Profile = {
  bgImage: string;
  avatar: string;
  bio: string;
};

export type UpdateProfile = Partial<Profile>;

export type CreateNewChat = {
  targetUserId: string;
  currentUserId: string;
};
