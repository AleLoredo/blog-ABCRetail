const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../data/posts.json');
const usersPath = path.join(__dirname, '../data/users.json');

class BlogController {

  // Obtener todas las publicaciones
  static async getPosts(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      res.render('index', { posts });
    } catch (err) {
      console.error('Error al obtener las publicaciones:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Mostrar formulario para nueva publicación
  static newPostForm(req, res) {
    res.render('new');
  }

  // Crear una nueva publicación
  static async createPost(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      const { title, content, author, category } = req.body;
  
      const newPost = {
        id: posts.length + 1,
        title,
        content,
        author,
        category,
        comments: []
      };
  
      posts.push(newPost);
      await fs.writeFile(dataPath, JSON.stringify(posts));
      res.redirect('/');
    } catch (err) {
      console.error('Error al crear la publicación:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Formulario para editar publicación
  static async editPostForm(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      const post = posts.find(p => p.id == req.params.id);
      res.render('edit', { post });
    } catch (err) {
      console.error('Error al cargar el formulario de edición:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Actualizar publicación
  static async updatePost(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      const post = posts.find(p => p.id == req.params.id);
      post.title = req.body.title;
      post.content = req.body.content;
      await fs.writeFile(dataPath, JSON.stringify(posts));
      res.redirect('/');
    } catch (err) {
      console.error('Error al actualizar la publicación:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Eliminar publicación
  static async deletePost(req, res) {
    try {
      let posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      posts = posts.filter(p => p.id != req.params.id);
      await fs.writeFile(dataPath, JSON.stringify(posts));
      res.redirect('/');
    } catch (err) {
      console.error('Error al eliminar la publicación:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Agregar un comentario
  static async addComment(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      const post = posts.find(p => p.id == req.params.id);
      const newComment = { text: req.body.comment };
      post.comments.push(newComment);
      await fs.writeFile(dataPath, JSON.stringify(posts));
      res.redirect('/');
    } catch (err) {
      console.error('Error al agregar el comentario:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Registrar un nuevo usuario
  static async registerUser(req, res) {
    try {
      const users = await fs.readFile(usersPath, 'utf8').then(data => JSON.parse(data));
      const { username, password } = req.body;

      // Verificar si el usuario ya existe
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        return res.send('El usuario ya existe');
      }

      // Crear nuevo usuario
      const newUser = { username, password };
      users.push(newUser);
      await fs.writeFile(usersPath, JSON.stringify(users));
      res.send('Usuario registrado con éxito');
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Iniciar sesión
  static async loginUser(req, res) {
    try {
      const users = await fs.readFile(usersPath, 'utf8').then(data => JSON.parse(data));
      const { username, password } = req.body;

      // Verificar si el usuario existe y la contraseña es correcta
      const user = users.find(user => user.username === username && user.password === password);
      if (!user) {
        return res.send('Usuario o contraseña incorrectos');
      }

      // Redirigir al panel de usuario o página principal
      res.send('/'); //ruta- direccion
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).send('Error del servidor');
    }
  }

  // Búsqueda de publicaciones
  static async searchPosts(req, res) {
    try {
      const posts = await fs.readFile(dataPath, 'utf8').then(data => JSON.parse(data));
      const { query } = req.query;

      const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.category.toLowerCase().includes(query.toLowerCase())
      );

      res.render('index', { posts: filteredPosts });
    } catch (err) {
      console.error('Error al buscar publicaciones:', err);
      res.status(500).send('Error del servidor');
    }
  }
}

module.exports = BlogController;