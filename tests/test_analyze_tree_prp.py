import os
import sys
import unittest

sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from lib.analyze_tree_prp import analyze_tree_prp


class AnalyzeTreePrpTest(unittest.TestCase):
    def test_sample_tree(self):
        tree = {
            "node_id": "root",
            "parent_node_id": None,
            "reward": 1,
            "probability": 1.0,
            "children": [
                {
                    "node_id": "A",
                    "parent_node_id": "root",
                    "reward": 2,
                    "probability": 0.5,
                    "children": []
                },
                {
                    "node_id": "B",
                    "parent_node_id": "root",
                    "reward": 3,
                    "probability": 0.5,
                    "children": []
                }
            ]
        }
        expected = [
            {'node_id': 'root', 'path': ['root'], 'reward': 1, 'probability': 1.0},
            {'node_id': 'A', 'path': ['root', 'A'], 'reward': 2, 'probability': 0.5},
            {'node_id': 'B', 'path': ['root', 'B'], 'reward': 3, 'probability': 0.5}
        ]
        self.assertEqual(analyze_tree_prp(tree), expected)


if __name__ == '__main__':
    unittest.main()
