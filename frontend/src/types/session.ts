export type SessionState = {
  session_id: string;
  user_id: string | null;
  tree_state: { [node_id: string]: { expanded: boolean } };
  last_selected_node_id: string;
  timestamp: string; // ISO8601
};
