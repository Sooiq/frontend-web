export interface UserResDto {
  id: string;
  name: string;
  email: string;
  username: string;
  country_of_residence: string;
  profile_picture_url?: string | null;
  is_noti_agreed: boolean;
  play_noti_sound: boolean;
  last_logged_in_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegisterUserReqDto {
  name: string;
  email: string;
  username: string;
  password: string;
  country_of_residence: string;
  profile_picture?: Uint8Array;
  is_noti_agreed?: boolean;
  play_noti_sound?: boolean;
  provider?: string;
  fcm_token?: string;
}
