var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        //validate: { isUrl: true },
    },
    route: {
        type: Sequelize.VIRTUAL,
        get: function(){ return '/wiki/' + this.urlTitle}
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN
    }
},
    {
        hooks: {
            beforeValidate: (page) => {
                if(page.title){
                    var regex = /[!@#\$%\^\&*\)\(+=._', -:;"<>]/g;
                    page.urlTitle =  page.title.replace(regex, "_");
                } else {
                    page.urlTitle = Math.random().toString(36).substring(2, 7);
                }
            }
        }
    }
);

const User = db.define('user', {
    name: { type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true }
    }
});

Page.belongsTo(User, {as: 'author'});

module.exports = {
    db: db,
    Page: Page,
    User: User
};
