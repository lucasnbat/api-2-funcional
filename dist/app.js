"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
require('./database'); // já chama o index.js automatico

_dotenv2.default.config();

const whiteList = [
  'http://localhost:3001',
  'http://192.168.100.200:3001',
  'http://192.168.100.200',
  'http://192.168.100.122',
  'http://192.168.100.122:3000',
  'http://localhost:3000',
  'http://192.168.100.84:3000',
];
const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // permite o site
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions)); // permite que outras aplicações acessem a api
    this.app.use(_helmet2.default.call(void 0, )); // adiciona segurança a aplicação
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json()); // para trabalhar com json na app
    this.app.use('/images/', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images'))); // caminho para arquivos estaticos
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/tokens', _tokenRoutes2.default); // adicionando a rota de token
    this.app.use('/alunos', _alunoRoutes2.default); // adicionando a rota de aluno
    this.app.use('/fotos', _fotoRoutes2.default); // adicionando a rota de foto
  }
}

exports. default = new App().app; // exportando a app (que na vdd é o express)
