export class Check {
  static isEmpty(val: string|number):boolean {
    if (val) {
      return true;
    }
    return false;
  }

  static isEmail(val: string):boolean {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg.test(val.toLowerCase())) {
      return true;
    }
    return false;
  }

  static isBlank(val: string):boolean {
    const reg = /^\s*$/
    if (reg.test(val)) {
      return true;
    }
    return false;
  }

  static hasBlank(val: string):boolean {
    const reg = /\s/
    if (reg.test(val)) {
      return true;
    }
    return false;
  }

  static len(val: string, len:number):boolean {
    if (val&&val.length === len) {
      return true;
    }
    return false;
  }

  static min(val: string, len:number):boolean {
    if (val&&val.length >= len) {
      return true;
    }
    return false;
  }

  static max(val: string, len:number):boolean {
    if (val&&val.length <= len) {
      return true;
    }
    return false;
  }
}
