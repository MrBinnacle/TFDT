def analyze_tree_prp(root: dict) -> list:
    def traverse(node, path, prob, output):
        node_id = node.get('node_id')
        current_path = path + [node_id]
        current_prob = prob * node.get('probability', 1)
        output.append({
            'node_id': node_id,
            'path': current_path,
            'reward': node.get('reward'),
            'probability': current_prob,
        })
        for child in node.get('children', []):
            traverse(child, current_path, current_prob, output)
    result = []
    traverse(root, [], 1.0, result)
    return result
