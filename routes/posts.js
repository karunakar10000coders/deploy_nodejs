const express = require('express');
const router = express.Router();

// In-memory data store
let posts = [
  { id: 1, title: 'Getting Started with Node.js', body: 'Node.js is a JavaScript runtime...', userId: 1 },
  { id: 2, title: 'Express.js Basics', body: 'Express is a minimal web framework...', userId: 1 },
  { id: 3, title: 'REST API Design', body: 'REST APIs follow a resource-based approach...', userId: 2 },
];
let nextId = 4;

// GET all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET post by ID
router.get('/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST create post
router.post('/', (req, res) => {
  const { title, body, userId } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: 'title and body are required' });
  }
  const post = { id: nextId++, title, body, userId: userId || null };
  posts.push(post);
  res.status(201).json(post);
});

// PUT update post
router.put('/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const { title, body, userId } = req.body;
  if (title) post.title = title;
  if (body) post.body = body;
  if (userId != null) post.userId = userId;
  res.json(post);
});

// DELETE post
router.delete('/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found' });
  const deleted = posts.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
