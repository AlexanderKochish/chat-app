export type Profile = {
  bgImage: string;
  avatar: string;
  bio: string;
  userId: string;
  id: string;
};

export type User = {
  email: string;
  name: string;
  id: string;
  profile: Profile;
};

export type Message = {
  id: string;
  text: string;

  createdAt: string;
  updatedAt: string;

  roomId: string;
  ownerId: string;
};

export type Members = {
  isBanned: boolean;
  isMuted: boolean;
  joinedAt: string;
  role: string;
  roomId: string;

  user: User;
  userId: string;
};

export type ChatRoomResponse = {
  createdAt: string;
  createdById: string;
  id: string;
  isGroup: boolean;
  members: Members[];
  messages: Message[];
  name: string | null;
};
