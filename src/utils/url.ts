export const USERS_ALL_URL: string = '/users';
export const USER_URL: string = `${USERS_ALL_URL}/:userId`;
export const USER_MINE_URL: string = `${USERS_ALL_URL}/me`;
export const USER_MINE_AVATAR_URL: string = `${USER_MINE_URL}/avatar`;

export const CARDS_ALL_URL: string = '/cards';
export const CARD_URL: string = `${CARDS_ALL_URL}/:cardId`;
export const CARD_LIKES_URL: string = `${CARD_URL}/likes`;
