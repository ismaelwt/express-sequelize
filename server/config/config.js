module.exports = {
	development: {
  	url: 'postgres://postgres:123456@localhost:5432/db-test',
  	dialect: 'postgres'
  },
	production: {
  	url: process.env.DATABASE_URL,
  	dialect: 'postgres'
  },
	staging: {
  	url: process.env.DATABASE_URL,
  	dialect: 'postgres'
  },
	test: {
  	url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/bookmark_test',
  	dialect: 'postgres'
  }
};
