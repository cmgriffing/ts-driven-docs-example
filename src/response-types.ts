export interface DatastoreRecord {
  createdAt: number;
  modifiedAt: number;
}

export interface PostTeamResponse extends DatastoreRecord {
  teamId: string;
  userId: string;
  name: string;
}

export interface ErrorResponse {
  message?: "";
}
