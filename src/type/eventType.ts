export type TEventJoin = {
    _id: string;
    userEmail: string;
    userName: string;
    userImageUrl: string;
};

export type TEvent = {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnail: string;
    location: string;
    date: string;
    userName: string;
    userEmail: string;
    userImageUrl: string;
};