import https from 'https';
import getGitConfigPath from 'git-config-path';
//import githubUsername from 'github-username';
import parseGitConfig from 'parse-git-config';
import which from 'which';

import config from './config';

export default async () => {
  const defaults = {
    name: '',
    description: '',
    author: config.author,
    repo: info => `${info.author}/${info.name}`,
    license: config.license ? config.license : 'MIT',
    manager: config.manager ? config.manager : 'npm',
    template: config.template ? config.template : 'default',
  };

  try {
    if (!config.author) {
      const gitConfigPath = getGitConfigPath('global');

      if (gitConfigPath) {
        const gitConfig = parseGitConfig.sync({ path: gitConfigPath });

        if (gitConfig.github && gitConfig.github.user) {
          defaults.author = gitConfig.github.user;
        } else if (gitConfig.user && gitConfig.user.email) {
          defaults.author = await githubUsername(gitConfig.user.email);
        }
      }

      if (defaults.author) {
        config.author = defaults.author;
      }
    }

    if (!config.manager) {
      if (which.sync('yarn', { nothrow: true })) {
        defaults.manager = 'yarn';
      }

      config.manager = defaults.manager;
    }

    if (!config.template) {
      config.template = defaults.template;
    }
  } catch (err) {
    throw new Error(err);
  }

  return defaults;
};

const githubUsername = async email => {
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/search/users?q=${email}%20in:email`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'abc',
    },
  };
  return await doRequest(options);
};

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @return {Promise} a promise of request
 */
function doRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', chunk => {
        responseBody += chunk;
      });

      res.on('end', () => {
        const response = JSON.parse(responseBody);
        resolve(response.items[0].login);
      });
    });

    req.on('error', err => {
      reject(err);
    });

    //req.write(data)
    req.end();
  });
}

/*const githubUsername=async (email)=>{
    
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  let body = '';

  res.on('data', chunk => {
    body += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(body);
    console.log('Got a response: ', response.items[0].login);
  });

});

req.on('error', error => {
  console.error(error);
});

req.end();
*/
