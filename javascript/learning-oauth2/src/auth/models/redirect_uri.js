export class RedirectUri {
    constructor(id, uri) {
        this.id = id;
        this.uri = uri;
    }

    validate() {
        if (this.id && this.uri) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid RedirectUri: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
          id: this.id,
          uri: this.uri  
        });
    }
}
