var express        = require('express')
, bodyParser     = require('body-parser')
, errorHandler   = require('errorhandler')
, methodOverride = require('method-override')
, morgan         = require('morgan')
, http           = require('http')
, path           = require('path')
, db             = require('./models')
, swig          = require('swig')
, routes        = require('./routes/index')
, api        = require('./routes/api')
, connectVtexid = require('connect-vtexid')

var vtexIdOptions = {
  redirectUrl: '/login?ReturnUrl=',
  logoutUrl: '/logout',
  useReturnUrl: false,
  verbose: true,
  addToWhiteList: [/^\/api/, /^\/publications/]
};

var app = express();

app.engine('html', swig.renderFile);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(connectVtexid(vtexIdOptions));
app.use('/', routes);
app.use('/api/payments/', api);

// development only
if ('development' === app.get('env')) {
    app.use(errorHandler())
}

db
.sequelize
.sync()
.complete(function(err) {
    if (err) {
        throw err
    } else {
        http.createServer(app).listen(app.get('port'), function() {
            console.log('Express server listening on port ' + app.get('port'))
        })
    }
})
