class Config {
  constructor() {
    this.logs = [];

    this.author = null;
    this.license = null;
    this.manager = null;
    this.template = null;
  }

  /*get count() {
    return this.logs.length;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }*/
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Config();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

export default Singleton;
